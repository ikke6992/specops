package nl.itvitae.specops.tasks;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity(name = "tasks")
@NoArgsConstructor
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne private TaskPlanning taskPlanning;

  private boolean isActive = true;

  private LocalDate deadline;

  @OneToOne(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
  private TaskExecution taskExecution;

  public Task(TaskPlanning taskPlanning, LocalDate deadline) {
    this.taskPlanning = taskPlanning;
    this.deadline = deadline;
  }
}
