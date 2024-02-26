package nl.itvitae.specops.tasks;

import jakarta.persistence.*;

import java.util.UUID;
import lombok.*;

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

  public TaskPlanning(@NonNull String name, int timeframe, int interval) {
    this.name = name;
    this.timeframe = timeframe;
    this.interval = interval;
  }
}
