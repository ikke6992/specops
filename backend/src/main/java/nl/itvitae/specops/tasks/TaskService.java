package nl.itvitae.specops.tasks;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
  private final TaskRepository taskRepository;

  public List<Task> getAll() {
    return taskRepository.findAll();
  }

  public Task save(String name, int timeframe, int interval, LocalDate date) {
    return taskRepository.save(new Task(name, timeframe, interval, date));
  }

  public List<Task> all() {
    return taskRepository.findAll();
  }
}
