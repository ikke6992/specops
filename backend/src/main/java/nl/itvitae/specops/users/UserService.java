package nl.itvitae.specops.users;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.exceptions.UserAlreadyExistsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import java.util.List;

// 2 Warnings, Fine for now
@Service
@RequiredArgsConstructor
public class UserService {
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public User save(String username, String password, String employeeName) {
    return userRepository.save(new User(username, passwordEncoder.encode(password)));
  }

  public User saveUser(User user) {
    Optional<User> theUser = userRepository.findByUsername(user.getUsername());
    if (theUser.isPresent()) {
      throw new UserAlreadyExistsException(user.getUsername());
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  public Optional<User> getByName(String name) {
    return userRepository.findByUsername(name);
  }

  public List<User> getAll() {
    return userRepository.findAll();
  }
}
