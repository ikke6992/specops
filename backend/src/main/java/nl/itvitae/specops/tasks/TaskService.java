package nl.itvitae.specops.tasks;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {
  private final TaskRepository taskRepository;

  public Task save(String name) {
    return taskRepository.save(new Task(name));
  }

  public List<Task> all() {
    return taskRepository.findAll();
  }
}
