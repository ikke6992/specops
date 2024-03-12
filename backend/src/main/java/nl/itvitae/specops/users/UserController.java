package nl.itvitae.specops.users;

import lombok.RequiredArgsConstructor;
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
  public ResponseEntity<UserDTO> saveUser(@RequestBody User user, UriComponentsBuilder ucb) {
    User savedUser = userService.saveUser(user);

    URI locationOfNewUser =
            ucb.path("users/{id}").buildAndExpand(savedUser.getId()).toUri();

    return ResponseEntity.created(locationOfNewUser).body(new UserDTO(savedUser));
  }
}
