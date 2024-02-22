package nl.itvitae.specops.tasks;

import jakarta.persistence.*;

import java.util.Date;
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

  private String tempUser;

  @ManyToOne private User user;

  private boolean isDone;

  public Task() {};

  public Task(String name, String tempUser) {
    this.name = name;
    this.tempUser = tempUser;
    this.isDone = false;
  }
}
