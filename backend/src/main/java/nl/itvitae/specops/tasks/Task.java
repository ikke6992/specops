package nl.itvitae.specops.tasks;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;
import lombok.*;

@Getter
@Setter
@Entity(name = "tasks")
@RequiredArgsConstructor
@NoArgsConstructor
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @NonNull private String name;

  private int timeframe; // In days
  private int interval; // In days

  private LocalDate deadline;

  public Task(@NonNull String name, int timeframe, int interval, LocalDate deadline) {
    this.name = name;
    this.timeframe = timeframe;
    this.interval = interval;
    this.deadline = deadline;
  }
}
