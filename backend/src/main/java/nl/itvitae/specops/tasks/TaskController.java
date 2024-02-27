package nl.itvitae.specops.tasks;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import nl.itvitae.specops.departments.DepartmentRepository;
import nl.itvitae.specops.departments.DepartmentService;
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

  @GetMapping
  public ResponseEntity<List<TaskResponse>> getAll() {
    final List<Task> tasks = taskService.getAllTasks();
    final List<TaskResponse> data = tasks.stream().map(TaskResponse::of).toList();
    return ResponseEntity.ok(data);
  }

  private record OldData(String name) {}

  @PostMapping
  public ResponseEntity<TaskPlanning> addTask(@RequestBody OldData data, UriComponentsBuilder ucb) {
    final Department department = departmentRepository.findAll().get(0);
    if (data.name() != null) {
      TaskPlanning taskPlanning = taskService.save(data.name(), 7, 7, department, LocalDate.now());
      URI locationOfNewTask =
          ucb.path("/tasks").buildAndExpand(taskService.getAllTaskPlannings().size()).toUri();
      return ResponseEntity.created(locationOfNewTask).body(taskPlanning);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  // This should be used instead of the old endpoint.
  @PostMapping("/new")
  public ResponseEntity<TaskPlanning> addTaskNew(
      @RequestBody TaskRequest taskData, UriComponentsBuilder ucb) {
    if (taskData.name() != null) {
      TaskPlanning taskPlanning =
          taskService.save(
              taskData.name(),
              taskData.timeframe(),
              taskData.interval(),
              taskData.department(),
              taskData.date());
      URI locationOfNewTask =
          ucb.path("/tasks").buildAndExpand(taskService.getAllTaskPlannings().size()).toUri();
      return ResponseEntity.created(locationOfNewTask).body(taskPlanning);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  @PatchMapping("/setComplete/{id}")
  public ResponseEntity<TaskExecution> setComplete(@PathVariable UUID id) {
    final User user = userRepository.findAll().get(0);
    var possibleTask = taskService.findById(id);
    if (possibleTask.isEmpty()) return ResponseEntity.notFound().build();
    final Task task = possibleTask.get();
    return ResponseEntity.ok(taskService.execute(task, user));
  }
}
