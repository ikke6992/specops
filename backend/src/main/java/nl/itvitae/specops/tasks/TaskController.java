package nl.itvitae.specops.tasks;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController {
  private final TaskService taskService;

  private record TaskData(String name) {}

  @PostMapping
  public ResponseEntity<Task> addTask(@RequestBody TaskData taskData, UriComponentsBuilder ucb) {
    if (taskData.name != null) {
      Task task = taskService.save(taskData.name);
      URI locationOfNewTask =
          ucb.path("/tasks").buildAndExpand(taskService.getAll().size()).toUri();
      return ResponseEntity.created(locationOfNewTask).body(task);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }
}
