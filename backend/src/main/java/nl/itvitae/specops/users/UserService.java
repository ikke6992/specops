package nl.itvitae.specops.users;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

// 2 Warnings, Fine for now
@Service
@RequiredArgsConstructor
public class UserService {
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public User save(String username, String password, String employeeName) {
    return userRepository.save(new User(username, passwordEncoder.encode(password), employeeName));
  }

  public User getByName(String name) {
    return userRepository.findByUsername(name).get();
  }

  public List<User> getAll() {
    return userRepository.findAll();
  }
}
