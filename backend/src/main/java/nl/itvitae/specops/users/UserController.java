package nl.itvitae.specops.users;

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

  @GetMapping
  public Iterable<User> getAll() {
    return userRepository.findAll();
  }

  private record UserRequestData(String roles, String employeeName, String department) {}

  @PostMapping("/create")
  public ResponseEntity<User> create(@RequestBody UserRequestData req) {
    if (departmentRepository.findByName(req.department()).isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    final Department department = departmentRepository.findByName(req.department()).get();
    return ResponseEntity.ok(userService.save(req.roles(), req.employeeName(), department));
  }

  @PutMapping("/edit/{id}")
  public ResponseEntity<User> edit(@PathVariable UUID id, @RequestBody UserRequestData req) {
    if (userRepository.findById(id).isEmpty()) return ResponseEntity.notFound().build();
    final User user = userRepository.findById(id).get();

    if (departmentRepository.findByName(req.department()).isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    final Department department = departmentRepository.findByName(req.department()).get();
    user.setDepartment(department);
    user.setRoles(req.roles());
    user.setEmployeeName(req.employeeName());

    return ResponseEntity.ok(userRepository.save(user));
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
