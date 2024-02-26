package nl.itvitae.specops.tasks;

import java.util.List;
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

  public TaskPlanning save(
      String name, int timeframe, int interval, Department department, LocalDate date) {
    TaskPlanning taskPlanning =
        taskPlanningRepository.save(new TaskPlanning(name, timeframe, interval, department));
    taskRepository.save(new Task(taskPlanning, date));
    return taskPlanning;
  }

  public TaskExecution execute(Task task, User user) {
    LocalDate executionDate = LocalDate.now();
    TaskExecution executedTask = new TaskExecution(task, user, executionDate);
    taskExecutionRepository.save(executedTask);
    Task newTask =
        new Task(
            task.getTaskPlanning(), executionDate.plusDays(task.getTaskPlanning().getInterval()));
    taskRepository.save(newTask);
    return executedTask;
  }

  public List<TaskPlanning> getAllTaskPlannings() {
    return taskPlanningRepository.findAll();
  }
}
