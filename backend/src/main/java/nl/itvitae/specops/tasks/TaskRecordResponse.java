package nl.itvitae.specops.tasks;

import java.time.LocalDate;
import java.util.UUID;

public record TaskRecordResponse(
    UUID id,
    String name,
    String assignee,
    String notes,
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
    final String notes = execution.getNotes();
    final LocalDate deadline = execution.getTask().getDeadline();
    final LocalDate executionDate = execution.getExecutionDate();
    final String status = getStatus(deadline, executionDate);

    return new TaskRecordResponse(id, name, assignee, notes, executionDate, deadline, status);
  }
}
