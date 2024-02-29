package nl.itvitae.specops.tasks;

import java.time.LocalDate;
import java.util.UUID;

public record TaskResponse(
    UUID taskId,
    UUID taskPlanningId,
    String name,
    String department,
    LocalDate startDate,
    LocalDate deadline,
    String status) {
  static String getStatus(LocalDate deadline, LocalDate startDate) {
    final LocalDate now = LocalDate.now();

    if (now.isBefore(startDate)) {
      return "planned";
    } else if (now.isBefore(deadline)) {
      return "pending";
    } else {
      return "overdue";
    }
  }

  static TaskResponse of(Task task) {
    final TaskPlanning taskPlanning = task.getTaskPlanning();
    final UUID taskId = task.getId();
    final UUID taskPlanningId = taskPlanning.getId();
    final String name = taskPlanning.getName();
    final String department = taskPlanning.getDepartment().getName();
    final LocalDate deadline = task.getDeadline();
    final LocalDate startDate = deadline.minusDays(taskPlanning.getTimeframe());
    final String status = getStatus(deadline, startDate);

    return new TaskResponse(taskId, taskPlanningId, name, department, startDate, deadline, status);
  }
}
