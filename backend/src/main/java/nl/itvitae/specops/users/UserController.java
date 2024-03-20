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
  public LoginResponse register(@RequestBody LoginRequest req) {
    return userService.register(req);
  }

  @PostMapping("/login")
  public LoginResponse login(@RequestBody LoginRequest req) {
    return userService.login(req);
  }
}
