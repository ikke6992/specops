package nl.itvitae.specops.users;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.exceptions.UserAlreadyExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
  private final UserRepository userRepository;
  private final UserService userService;

  @GetMapping
  public Iterable<User> getAll() {
    return userRepository.findAll();
  }

  @PostMapping("/signup")
  public ResponseEntity<UserDTO> signup(@RequestBody User user, UriComponentsBuilder ucb) {
    try {
      User savedUser = userService.saveUser(user);
      URI locationOfNewUser = ucb.path("users/{id}").buildAndExpand(savedUser.getId()).toUri();

      return ResponseEntity.created(locationOfNewUser).body(new UserDTO(savedUser));
    } catch (UserAlreadyExistsException e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping("/login-old")
  public ResponseEntity<User> login(@RequestBody User user, UriComponentsBuilder ucb) {
    if (userService.getByName(user.getUsername()).isPresent()) {
      return ResponseEntity.ok(userService.getByName(user.getUsername()).get());
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping("/register")
  public LoginResponse register(@RequestBody LoginRequest req) {
    return userService.register(req);
  }

  @PostMapping("/login")
  public LoginResponse login(@RequestBody LoginRequest req) {
    return userService.login(req);
  }
}
