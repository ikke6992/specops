package nl.itvitae.specops.users;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.*;
import nl.itvitae.specops.departments.Department;

@Getter
@Setter
@Entity(name = "users")
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @NonNull private String username;

  @NonNull private String password;

  @NonNull private String roles;

  @NonNull private String employeeName;

  @ManyToOne private Department department;
}
