package nl.itvitae.specops.tasks;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.users.User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {
  private final TaskRepository taskRepository;

  public Task save(String name, String tempUser) {
    return taskRepository.save(new Task(name, tempUser));
  }
}
