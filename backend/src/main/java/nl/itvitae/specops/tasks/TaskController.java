package nl.itvitae.specops.tasks;

import java.net.URI;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import nl.itvitae.specops.departments.DepartmentRepository;
import nl.itvitae.specops.departments.DepartmentService;
import nl.itvitae.specops.users.User;
import nl.itvitae.specops.users.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {
  private final TaskService taskService;
  private final UserRepository userRepository;
  private final DepartmentService departmentService;
  private final TaskExecutionRepository taskExecutionRepository;

  @GetMapping
  public ResponseEntity<List<TaskResponse>> getAll() {
    // Get already executed tasks
    final List<TaskExecution> taskExecutions = taskExecutionRepository.findAll();
    final List<Task> executedTasks = taskExecutions.stream().map(TaskExecution::getTask).toList();

    final List<Task> tasks =
        taskService.getAllTasks().stream()
            .filter(Task::isActive) // Filter executed tasks
            .sorted(Comparator.comparing(Task::getDeadline)) // Sort based on deadline
            .toList();

    final List<TaskResponse> data = tasks.stream().map(TaskResponse::of).toList();

    return ResponseEntity.ok(data);
  }

  @GetMapping("/list")
  public ResponseEntity<List<TaskPlanningResponse>> getTaskList() {

    final List<TaskPlanning> taskPlannings = taskService.getAllTaskPlannings();
    final List<TaskPlanningResponse> data =
        taskPlannings.stream().map(TaskPlanningResponse::of).toList();

    return ResponseEntity.ok(data);
  }

  @GetMapping("/history")
  public ResponseEntity<List<TaskRecordResponse>> getAllHistory() {
    final List<TaskExecution> taskExecutions = taskExecutionRepository.findAll();
    final List<TaskRecordResponse> records =
        taskExecutions.stream()
            .sorted(Comparator.comparing(TaskExecution::getExecutionDate))
            .map(TaskRecordResponse::of)
            .toList();

    return ResponseEntity.ok(records);
  }

  private record OldData(String name, int timeframe, int interval, String deadline) {}

  @PostMapping
  public ResponseEntity<TaskResponse> addTask(
      @RequestBody TaskRequest data, UriComponentsBuilder ucb) {
    final Department department = departmentService.getByName(data.dept());
    List<TaskPlanning> plannings = taskService.getAllTaskPlannings();
    if (data.name() == null || data.deadline() == null) {
      return ResponseEntity.badRequest().build();
    }
    for (TaskPlanning planning : plannings) {
      if (data.name().equals(planning.getName()) && department.equals(planning.getDepartment())) {
        return ResponseEntity.badRequest().build();
      }
    }
    final Task task =
        taskService.save(
            data.name(),
            data.timeframe(),
            data.interval(),
            department,
            LocalDate.parse(data.deadline()));
    final TaskResponse response = TaskResponse.of(task);
    URI locationOfNewTask = ucb.path("/tasks").buildAndExpand(plannings.size()).toUri();
    return ResponseEntity.created(locationOfNewTask).body(response);
  }

  @PatchMapping("/edit/{id}")
  public ResponseEntity<TaskResponse> editTask(
      @PathVariable UUID id, @RequestBody TaskRequest data) {
    var possibleTask = taskService.findTaskById(id);
    if (possibleTask.isEmpty()) return ResponseEntity.notFound().build();
    final Task task = possibleTask.get();
    final Department department = departmentService.getByName(data.dept());
    List<TaskPlanning> plannings = taskService.getAllTaskPlannings();
    for (TaskPlanning planning : plannings) {
      if (!planning.equals(task.getTaskPlanning())
          && data.name().equals(planning.getName())
          && department.equals(planning.getDepartment())) {
        return ResponseEntity.badRequest().build();
      }
    }
    taskService.editTask(
        task,
        data.name(),
        department,
        data.timeframe(),
        data.interval(),
        LocalDate.parse(data.deadline()));
    final TaskResponse response = TaskResponse.of(task);
    return ResponseEntity.ok(response);
  }

  private record Notes(String notes) {}

  @PatchMapping("/setComplete/{id}")
  public ResponseEntity<TaskResponse> setComplete(@PathVariable UUID id, @RequestBody Notes notes) {
    final String principal =
        (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    final User user = userRepository.findByUsername(principal).get();
    var possibleTask = taskService.findTaskById(id);
    if (possibleTask.isEmpty()) return ResponseEntity.notFound().build();
    final Task task = possibleTask.get();
    final Task newTask = taskService.execute(task, user, notes.notes());
    final TaskResponse response = TaskResponse.of(newTask);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<TaskPlanningResponse> deactivateTask(@PathVariable UUID id) {
    var possiblePlanning = taskService.findTaskPlanningById(id);
    if (possiblePlanning.isEmpty()) return ResponseEntity.notFound().build();
    final TaskPlanning planning = possiblePlanning.get();
    for (Task task : planning.getTasks()) {
      if (task.isActive()) {
        TaskPlanning updatedPlanning = taskService.deactivateTask(task);
        final TaskPlanningResponse response = TaskPlanningResponse.of(updatedPlanning);
        return ResponseEntity.ok(response);
      }
    }
    return ResponseEntity.notFound().build();
  }

  @PatchMapping("/activate/{id}")
  public ResponseEntity<TaskPlanningResponse> reactivateTask(@PathVariable UUID id) {
    var possiblePlanning = taskService.findTaskPlanningById(id);
    if (possiblePlanning.isEmpty()) return ResponseEntity.notFound().build();
    final TaskPlanning planning = possiblePlanning.get();
    final Task task = taskService.reactivateTask(planning);
    final TaskPlanningResponse response = TaskPlanningResponse.of(task.getTaskPlanning());
    return ResponseEntity.ok(response);
  }
}
