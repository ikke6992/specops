package nl.itvitae.specops.tasks;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import nl.itvitae.specops.users.User;

@Getter
@Setter
@Entity(name = "tasks")
@RequiredArgsConstructor
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @NonNull private String name;

  @ManyToOne private User user;
}
