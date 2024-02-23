package nl.itvitae.specops.tasks;

import java.time.LocalDate;

public record TaskResponse(
    int id, String name, LocalDate startDate, LocalDate deadline, String status) {
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
    final int id = task.getId().hashCode();
    final String name = task.getName();
    final LocalDate deadline = task.getDeadline();
    final LocalDate startDate = deadline.minusDays(task.getTimeframe());
    final String status = getStatus(deadline, startDate);

    return new TaskResponse(id, name, startDate, deadline, status);
  }
}
