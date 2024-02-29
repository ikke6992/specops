package nl.itvitae.specops.tasks;

import java.time.LocalDate;
import java.util.UUID;

public record TaskResponse(
    UUID id,
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
    final UUID id = task.getId();
    final String name = task.getTaskPlanning().getName();
    final String department = task.getTaskPlanning().getDepartment().getName();
    final LocalDate deadline = task.getDeadline();
    final LocalDate startDate = deadline.minusDays(task.getTaskPlanning().getTimeframe());
    final String status = getStatus(deadline, startDate);

    return new TaskResponse(id, name, department, startDate, deadline, status);
  }
}
