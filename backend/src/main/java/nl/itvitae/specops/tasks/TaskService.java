package nl.itvitae.specops.tasks;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import nl.itvitae.specops.users.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TaskService {
  private final TaskRepository taskRepository;
  private final TaskPlanningRepository taskPlanningRepository;
  private final TaskExecutionRepository taskExecutionRepository;

  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }

  public Task save(
      String name, int timeframe, int interval, Department department, LocalDate date) {
    TaskPlanning taskPlanning =
        taskPlanningRepository.save(new TaskPlanning(name, timeframe, interval, department));
    final Task task = new Task(taskPlanning, date);
    taskRepository.save(task);
    return task;
  }

  public Task execute(Task task, User user) {
    LocalDate executionDate = LocalDate.now();
    TaskExecution executedTask = new TaskExecution(task, user, executionDate);
    taskExecutionRepository.save(executedTask);
    Task newTask =
        new Task(
            task.getTaskPlanning(), executionDate.plusDays(task.getTaskPlanning().getInterval()));
    taskRepository.save(newTask);
    return newTask;
  }

  public List<TaskPlanning> getAllTaskPlannings() {
    return taskPlanningRepository.findAll();
  }

  public Optional<Task> findById(UUID id) {
    return taskRepository.findById(id);
  }
}
