package nl.itvitae.specops.security.config;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

  private final JwtTokenProvider jwtTokenProvider;

  public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String accessToken = jwtTokenProvider.resolveToken(request);
    if (accessToken == null) {
      filterChain.doFilter(request, response);
      return;
    }
    Claims claims = jwtTokenProvider.resolveClaims(request);

    if (claims != null && jwtTokenProvider.validateClaims(claims)) {
      String username = claims.getSubject();
      UserDetails userDetails = jwtTokenProvider.getUserDetailsFromToken(accessToken);
      Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
      Authentication authentication =
          new UsernamePasswordAuthenticationToken(username, "", authorities);
      SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    filterChain.doFilter(request, response);
  }
}
