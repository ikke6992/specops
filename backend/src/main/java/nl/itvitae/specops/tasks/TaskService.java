package nl.itvitae.specops.tasks;

import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TaskService {
  private final TaskRepository taskRepository;
  private final TaskPlanningRepository taskPlanningRepository;

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

  public List<TaskPlanning> getAllTaskPlannings() {
    return taskPlanningRepository.findAll();
  }
}
