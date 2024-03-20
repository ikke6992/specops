package nl.itvitae.specops.security;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.users.MyUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
  private final MyUserDetailsService userDetailsService;

  private final JwtTokenFilter jwtTokenFilter;

  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
    AuthenticationManagerBuilder authenticationManagerBuilder =
        http.getSharedObject(AuthenticationManagerBuilder.class);
    authenticationManagerBuilder
        .userDetailsService(userDetailsService)
        .passwordEncoder(passwordEncoder());
    return authenticationManagerBuilder.build();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(
            requests ->
                requests
                    .requestMatchers(HttpMethod.GET, "/tasks")
                    .hasRole("USER")
                    .requestMatchers(HttpMethod.GET, "/departments")
                    .hasRole("USER")
                    .requestMatchers(HttpMethod.GET, "/tasks/history")
                    .hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/tasks")
                    .hasRole("MANAGER")
                    .requestMatchers(HttpMethod.PATCH, "/tasks/edit/{id}")
                    .hasRole("MANAGER")
                    .requestMatchers(HttpMethod.PATCH, "/tasks/setComplete/{id}")
                    .hasRole("USER")
                    .requestMatchers(HttpMethod.DELETE, "/tasks/delete/{id}")
                    .hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PATCH, "/tasks/activate/{id}")
                    .hasRole("ADMIN")
                    .requestMatchers("/**")
                    .permitAll())
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
