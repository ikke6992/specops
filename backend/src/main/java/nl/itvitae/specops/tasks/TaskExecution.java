package nl.itvitae.specops.tasks;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.specops.users.User;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity(name = "task_executions")
@NoArgsConstructor
public class TaskExecution {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne private Task task;
  @ManyToOne private User user;

  private LocalDate executionDate;

  public TaskExecution(Task task, User user, LocalDate executionDate) {
    this.task = task;
    this.user = user;
    this.executionDate = executionDate;
  }
}
