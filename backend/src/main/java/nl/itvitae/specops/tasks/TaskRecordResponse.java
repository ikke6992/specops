package nl.itvitae.specops.tasks;

import java.time.LocalDate;
import java.util.UUID;

public record TaskRecordResponse(
    UUID id,
    String name,
    String assignee,
    LocalDate executionDate,
    LocalDate deadline,
    String status) {
  static String getStatus(LocalDate deadline, LocalDate executionDate) {
    if (executionDate.isAfter(deadline)) {
      return "too late";
    } else {
      return "on time";
    }
  }

  static TaskRecordResponse of(TaskExecution execution) {
    final UUID id = execution.getId();
    final String name = execution.getTask().getTaskPlanning().getName();
    final String assignee = execution.getUser().getEmployeeName();
    final LocalDate deadline = execution.getTask().getDeadline();
    final LocalDate executionDate = execution.getExecutionDate();
    final String status = getStatus(deadline, executionDate);

    return new TaskRecordResponse(id, name, assignee, executionDate, deadline, status);
  }
}
