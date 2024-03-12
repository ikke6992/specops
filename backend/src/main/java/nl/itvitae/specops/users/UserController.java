package nl.itvitae.specops.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
  private final UserRepository userRepository;

  record UserRegistrationDto(String username, String password) {
  }

  record UserRegistrationResultDto(UUID id, String username) {
  }

  @GetMapping
  public Iterable<User> getAll() {
    return userRepository.findAll();
  }

  @PostMapping("/signup")
  public ResponseEntity<?> register(@RequestBody UserRegistrationDto userRegistrationDto, UriComponentsBuilder ucb) {
    var username = userRegistrationDto.username.trim();
    if (username.isEmpty()) throw new BadInputException("username should not be blank");
    var password = userRegistrationDto.password.trim();
    if (password.isBlank()) throw new BadInputException("password should not be blank");
    var possibleUser = userRepository.findByUsername(username);
    if (possibleUser.isPresent()) throw new BadInputException("username already exists");

    var newUser = new User(username, password);
    userRepository.save(newUser);
    URI locationOfNewUser = ucb
            .path("{id}")
            .buildAndExpand(newUser.getId())
            .toUri();
    return ResponseEntity.created((locationOfNewUser)).body(new UserRegistrationResultDto(newUser.getId(), newUser.getUsername()));
  }
}
