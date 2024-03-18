package nl.itvitae.specops.security.dto;

import org.springframework.stereotype.Component;

@Component
public class LoginResponse {
  private String username;
  private String token;

  public LoginResponse() {}

  public LoginResponse(String username, String token) {
    this.username = username;
    this.token = token;
  }

  public String getToken() {
    return token;
  }

  public void setPassword(String token) {
    this.token = token;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getUsername() {
    return username;
  }
}
