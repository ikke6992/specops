package nl.itvitae.specops.users;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.exceptions.UserAlreadyExistsException;
import nl.itvitae.specops.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import java.util.List;

// 2 Warnings, Fine for now
@Service
@RequiredArgsConstructor
public class UserService {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public User save(String username, String password, String roles, String employeeName) {
    return userRepository.save(
        new User(username, passwordEncoder.encode(password), roles, employeeName));
  }

  public List<User> getAll() {
    return userRepository.findAll();
  }

  public LoginResponse login(LoginRequest request) {
    final Optional<User> optionalUser = userRepository.findByUsername(request.username());

    if (optionalUser.isEmpty()) {
      return new LoginResponse("User does not exist", "", "");
    }

    final User user = optionalUser.get();

    if (!passwordEncoder.matches(request.password(), user.getPassword())) {
      return new LoginResponse("Incorrect password", "", "");
    }

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.username(), request.password()));
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    return new LoginResponse(
        request.username(), jwtTokenProvider.generateToken(userDetails), user.getRoles());
  }

  public LoginResponse register(LoginRequest request) {
    if (userRepository.findByUsername(request.username()).isEmpty()) {
      User user =
          new User(request.username(), passwordEncoder.encode(request.password()), "ROLE_USER", "");
      userRepository.save(user);
      return login(request);
    }
    return new LoginResponse("User already exists", "", "");
  }
}
