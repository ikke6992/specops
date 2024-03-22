package nl.itvitae.specops.users;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import nl.itvitae.specops.departments.DepartmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
  private final UserRepository userRepository;
  private final UserService userService;
  private final DepartmentRepository departmentRepository;

  private record UserData(UUID id, String role, String name, String department) {
    static String getRoleString(String role) {
      if (role.contains("ROLE_ADMIN")) {
        return "manager";
      } else if (role.contains("ROLE_MANAGER")) {
        return "team manager";
      } else {
        return "analyst";
      }
    }

    static UserData of(User user) {
      final UUID id = user.getId();
      final String roles = getRoleString(user.getRoles());
      final String name = user.getEmployeeName();
      final String department = user.getDepartment().getName();
      return new UserData(id, roles, name, department);
    }
  }

  @GetMapping
  public List<UserData> getAll() {
    return userRepository.findAll().stream().map(UserData::of).toList();
  }

  private record UserRequestData(String roles, String employeeName, String department) {}

  @PostMapping("/create")
  public ResponseEntity<UserData> create(@RequestBody UserRequestData req) {
    if (departmentRepository.findByName(req.department()).isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    final Department department = departmentRepository.findByName(req.department()).get();
    return ResponseEntity.ok(
        UserData.of(userService.save(req.roles(), req.employeeName(), department)));
  }

  @PutMapping("/edit/{id}")
  public ResponseEntity<UserData> edit(@PathVariable UUID id, @RequestBody UserRequestData req) {
    if (userRepository.findById(id).isEmpty()) return ResponseEntity.notFound().build();
    final User user = userRepository.findById(id).get();

    if (departmentRepository.findByName(req.department()).isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    final Department department = departmentRepository.findByName(req.department()).get();
    user.setDepartment(department);
    user.setRoles(req.roles());
    user.setEmployeeName(req.employeeName());

    return ResponseEntity.ok(UserData.of(userRepository.save(user)));
  }

  @PostMapping("/signup/{requestId}")
  public ResponseEntity<LoginResponse> register(
      @RequestBody LoginRequest req, @PathVariable String requestId) {
    final Optional<User> userOptional = userRepository.findById(UUID.fromString(requestId));
    if (userOptional.isEmpty()) {
      return ResponseEntity.badRequest().build();
    }
    final User user = userOptional.get();
    if (user.getPassword() != null || user.getUsername() != null) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok(userService.register(req, user));
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
    return ResponseEntity.ok(userService.login(req));
  }
}
