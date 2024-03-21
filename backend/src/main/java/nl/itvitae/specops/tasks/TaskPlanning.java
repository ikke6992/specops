package nl.itvitae.specops.tasks;

import jakarta.persistence.*;

import java.util.Set;
import java.util.UUID;
import lombok.*;
import nl.itvitae.specops.departments.Department;

@Getter
@Setter
@Entity(name = "task_plannings")
@NoArgsConstructor
public class TaskPlanning {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @NonNull private String name;

  private int timeframe; // In days
  private int interval; // In days

  @ManyToOne private Department department;

  @OneToMany(mappedBy = "taskPlanning")
  private Set<Task> tasks;

  public TaskPlanning(@NonNull String name, int timeframe, int interval, Department department) {
    this.name = name;
    this.timeframe = timeframe;
    this.interval = interval;
    this.department = department;
  }
}
