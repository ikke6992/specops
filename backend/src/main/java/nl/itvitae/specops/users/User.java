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

  private String username;

  private String password;

  @NonNull private String roles;

  @NonNull private String employeeName;

  @ManyToOne private Department department;

  public User(
      String username, String password, @NonNull String roles, @NonNull String employeeName) {
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.employeeName = employeeName;
  }

  public User(@NonNull String roles, @NonNull String employeeName, Department department) {
    this.roles = roles;
    this.employeeName = employeeName;
    this.department = department;
  }
}
