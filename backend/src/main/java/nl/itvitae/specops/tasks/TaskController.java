package nl.itvitae.specops.tasks;

import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {
  private final TaskService taskService;
  ;

  private record TaskData(
      String name, int timeframe, int interval, Department department, LocalDate date) {}

  @GetMapping
  public ResponseEntity<List<TaskResponse>> getAll() {
    final List<Task> tasks = taskService.getAllTasks();
    final List<TaskResponse> data = tasks.stream().map(TaskResponse::of).toList();
    return ResponseEntity.ok(data);
  }

  @PostMapping
  public ResponseEntity<TaskPlanning> addTask(
      @RequestBody TaskData taskData, UriComponentsBuilder ucb) {
    if (taskData.name != null) {
      TaskPlanning taskPlanning =
          taskService.save(
              taskData.name,
              taskData.timeframe,
              taskData.interval,
              taskData.department,
              taskData.date);
      URI locationOfNewTask =
          ucb.path("/tasks").buildAndExpand(taskService.getAllTaskPlannings().size()).toUri();
      return ResponseEntity.created(locationOfNewTask).body(taskPlanning);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }
}
