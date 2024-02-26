package nl.itvitae.specops.tasks;

import java.net.URI;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {
  private final TaskService taskService;
  @Autowired TaskRepository taskRepository;

  @GetMapping
  public ResponseEntity<List<Task>> getAll() {
    final List<Task> tasks = taskService.all();
    return ResponseEntity.ok(tasks);
  }

  private record TaskData(String name) {}

  @PostMapping
  public ResponseEntity<Task> addTask(@RequestBody TaskData taskData, UriComponentsBuilder ucb) {
    if (taskData.name != null) {
      Task task = taskService.save(taskData.name);
      URI locationOfNewTask = ucb.path("/tasks").buildAndExpand(taskService.all().size()).toUri();
      return ResponseEntity.created(locationOfNewTask).body(task);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  //  @PatchMapping("/patch/{id}")
  //  public ResponseEntity<?> patch(
  //      @RequestBody Task changedTask, @PathVariable(name = "id") UUID id) {
  //    var possibleOriginalTask = taskService.findById(id);
  //    if (possibleOriginalTask.isEmpty()) return ResponseEntity.notFound().build();
  //
  //    var task = possibleOriginalTask.get();
  //    var updateIsDone = changedTask.isDone();
  //    task.setDone(true);
  //
  //    taskService.save(task.getName());
  //    return ResponseEntity.ok(task);
  //  }

  @PatchMapping("/setComplete/{id}")
  public ResponseEntity<Task> setComplete(@PathVariable UUID id) {
    var possibleTask = taskService.findById(id);
    if (possibleTask.isEmpty()) return ResponseEntity.notFound().build();

    var task = possibleTask.get();
    task.setDone(true);
    taskRepository.save(task);
    return ResponseEntity.ok(task);
  }
}
