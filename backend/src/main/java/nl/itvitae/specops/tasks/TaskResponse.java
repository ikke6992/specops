package nl.itvitae.specops.tasks;

import java.time.LocalDate;
import java.util.UUID;

public record TaskResponse(
    UUID id,
    String name,
    int timeframe,
    int interval,
    String department,
    LocalDate startDate,
    LocalDate deadline,
    String status) {
  static String getStatus(LocalDate deadline, LocalDate startDate) {
    final LocalDate now = LocalDate.now();

    if (now.isAfter(deadline)) {
      return "overdue";
    } else if (now.isBefore(startDate)) {
      return "planned";
    } else {
      return "pending";
    }
  }

  static TaskResponse of(Task task) {
    final TaskPlanning taskPlanning = task.getTaskPlanning();
    final UUID id = task.getId();
    final String name = taskPlanning.getName();
    final int timeframe = taskPlanning.getTimeframe();
    final int interval = taskPlanning.getInterval();
    final String department = taskPlanning.getDepartment().getName();
    final LocalDate deadline = task.getDeadline();
    final LocalDate startDate = deadline.minusDays(taskPlanning.getTimeframe());
    final String status = getStatus(deadline, startDate);

    return new TaskResponse(id, name, timeframe, interval, department, startDate, deadline, status);
  }
}
