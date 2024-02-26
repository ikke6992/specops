package nl.itvitae.specops.tasks;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.*;
import nl.itvitae.specops.users.User;

@Getter
@Setter
@Entity(name = "tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String name;

  @ManyToOne private User user;

  private boolean isDone;

  public Task() {}
  ;

  public Task(String name) {
    this.name = name;
    this.isDone = false;
  }
}
