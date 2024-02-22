package nl.itvitae.specops.tasks;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
  private final TaskRepository taskRepository;

  public List<Task> getAll() {
    return taskRepository.findAll();
  }

  public Task save(String name) {
    return taskRepository.save(new Task(name));
  }

  public List<Task> all() {
    return taskRepository.findAll();
  }
}
