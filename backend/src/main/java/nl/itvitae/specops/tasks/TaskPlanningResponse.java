package nl.itvitae.specops.tasks;

import java.util.UUID;

public record TaskPlanningResponse(
    UUID id, String name, int timeframe, int interval, String department, String status) {

  static String getStatus(TaskPlanning taskPlanning) {
    for (Task task : taskPlanning.getTasks()) {
      if (task.isActive()) {
        return TaskResponse.getStatus(
            task.getDeadline(), task.getDeadline().minusDays(taskPlanning.getTimeframe()));
      }
    }
    return "inactive";
  }

  static TaskPlanningResponse of(TaskPlanning taskPlanning) {
    final UUID id = taskPlanning.getId();
    final String name = taskPlanning.getName();
    final int timeframe = taskPlanning.getTimeframe();
    final int interval = taskPlanning.getInterval();
    final String department = taskPlanning.getDepartment().getName();
    final String status = getStatus(taskPlanning);

    return new TaskPlanningResponse(id, name, timeframe, interval, department, status);
  }
}
