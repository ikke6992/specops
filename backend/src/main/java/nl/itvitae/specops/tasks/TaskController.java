package nl.itvitae.specops.tasks;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {
  private final TaskService taskService;

  @GetMapping
  public ResponseEntity<List<TaskResponse>> getAll() {
    final List<Task> tasks = taskService.all();
    final List<TaskResponse> data = tasks.stream().map(TaskResponse::of).toList();
    return ResponseEntity.ok(data);
  }

  @PostMapping
  public ResponseEntity<Task> addTask(@RequestBody TaskRequest taskData, UriComponentsBuilder ucb) {
    if (taskData.name() != null) {
      Task task =
          taskService.save(
              taskData.name(), taskData.timeframe(), taskData.interval(), taskData.date());
      URI locationOfNewTask =
          ucb.path("/tasks").buildAndExpand(taskService.getAll().size()).toUri();
      return ResponseEntity.created(locationOfNewTask).body(task);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }
}
