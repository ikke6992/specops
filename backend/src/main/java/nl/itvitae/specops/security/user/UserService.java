package nl.itvitae.specops.security.user;

import nl.itvitae.specops.security.config.JwtTokenProvider;
import nl.itvitae.specops.security.dto.LoginRequest;
import nl.itvitae.specops.security.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired AuthenticationManager authenticationManager;

  @Autowired JwtTokenProvider jwtTokenProvider;

  @Autowired UserRepository userRepository;

  @Autowired PasswordEncoder passwordEncoder;

  public LoginResponse login(LoginRequest request) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    LoginResponse response =
        new LoginResponse(request.getUsername(), jwtTokenProvider.generateToken(userDetails));
    return response;
  }

  public LoginResponse register(LoginRequest request) {
    if (userRepository.findByUsername(request.getUsername()).isEmpty()) {
      User user =
          new User(
              request.getUsername(), passwordEncoder.encode(request.getPassword()), "ROLE_USER");
      userRepository.save(user);
      return login(request);
    }
    return new LoginResponse("Username already exists", "");
  }
}
