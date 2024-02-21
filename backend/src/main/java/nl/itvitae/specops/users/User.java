package nl.itvitae.specops.users;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "users")
@RequiredArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @NonNull private String username;

  @NonNull private String password;

  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long employeeId;

  @NonNull private String employeeName;
}
