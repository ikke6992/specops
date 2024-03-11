package nl.itvitae.specops.tasks;

import java.net.URI;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import nl.itvitae.specops.departments.DepartmentRepository;
import nl.itvitae.specops.users.User;
import nl.itvitae.specops.users.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {
  private final TaskService taskService;
  private final UserRepository userRepository;
  private final DepartmentRepository departmentRepository;
  private final TaskExecutionRepository taskExecutionRepository;

  @GetMapping
  public ResponseEntity<List<TaskResponse>> getAll() {
    // Get already executed tasks
    final List<TaskExecution> taskExecutions = taskExecutionRepository.findAll();
    final List<Task> executedTasks = taskExecutions.stream().map(TaskExecution::getTask).toList();

    final List<Task> tasks =
        taskService.getAllTasks().stream()
            .filter(task -> !executedTasks.contains(task)) // Filter executed tasks
            .sorted(Comparator.comparing(Task::getDeadline)) // Sort based on deadline
            .toList();

    final List<TaskResponse> data = tasks.stream().map(TaskResponse::of).toList();

    return ResponseEntity.ok(data);
  }

  @GetMapping("/history")
  public ResponseEntity<List<TaskRecordResponse>> getAllHistory() {
    final List<TaskExecution> taskExecutions = taskExecutionRepository.findAll();
    final List<TaskRecordResponse> records =
        taskExecutions.stream().map(TaskRecordResponse::of).toList();

    return ResponseEntity.ok(records);
  }

  private record OldData(String name, int timeframe, int interval, String deadline) {}

  @PostMapping
  public ResponseEntity<TaskResponse> addTask(@RequestBody OldData data, UriComponentsBuilder ucb) {
    final Department department = departmentRepository.findAll().get(0);
    if (data.name() == null || data.deadline() == null) {
      return ResponseEntity.badRequest().build();
    }
    final Task task =
        taskService.save(
            data.name(),
            data.timeframe(),
            data.interval(),
            department,
            LocalDate.parse(data.deadline()));
    final TaskResponse response = TaskResponse.of(task);
    URI locationOfNewTask =
        ucb.path("/tasks").buildAndExpand(taskService.getAllTaskPlannings().size()).toUri();
    return ResponseEntity.created(locationOfNewTask).body(response);
  }

  // This should be used instead of the old endpoint.
  @PostMapping("/new")
  public ResponseEntity<TaskResponse> addTaskNew(
      @RequestBody TaskRequest taskData, UriComponentsBuilder ucb) {
    if (taskData.name() != null) {
      final Task task =
          taskService.save(
              taskData.name(),
              taskData.timeframe(),
              taskData.interval(),
              taskData.department(),
              taskData.date());
      final TaskResponse taskResponse = TaskResponse.of(task);
      URI locationOfNewTask =
          ucb.path("/tasks").buildAndExpand(taskService.getAllTaskPlannings().size()).toUri();
      return ResponseEntity.created(locationOfNewTask).body(taskResponse);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  @PatchMapping("/edit/{id}")
  public ResponseEntity<TaskResponse> editTask(@PathVariable UUID id, @RequestBody OldData data) {
    var possibleTask = taskService.findTaskById(id);
    if (possibleTask.isEmpty()) return ResponseEntity.notFound().build();
    final Task task = possibleTask.get();
    taskService.editTask(
        task, data.name(), data.timeframe(), data.interval(), LocalDate.parse(data.deadline()));
    final TaskResponse response = TaskResponse.of(task);
    return ResponseEntity.ok(response);
  }

  @PatchMapping("/setComplete/{id}")
  public ResponseEntity<TaskResponse> setComplete(@PathVariable UUID id) {
    final User user = userRepository.findAll().get(0);
    var possibleTask = taskService.findTaskById(id);
    if (possibleTask.isEmpty()) return ResponseEntity.notFound().build();
    final Task task = possibleTask.get();
    final Task newTask = taskService.execute(task, user);
    final TaskResponse response = TaskResponse.of(newTask);
    return ResponseEntity.ok(response);
  }
}
