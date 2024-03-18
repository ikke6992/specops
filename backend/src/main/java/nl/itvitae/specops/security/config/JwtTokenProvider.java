package nl.itvitae.specops.security.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import nl.itvitae.specops.security.user.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {
  private final MyUserDetailsService userDetailsService;

  public JwtTokenProvider(MyUserDetailsService userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

  @Value("${app.jwt.secret}")
  private String jwtSecret;

  @Value("${app.jwt.expiration-in-ms}")
  private long jwtExpirationInMs;

  private JwtParser jwtParser;
  private SecretKey key;

  @PostConstruct
  private void init() {
    try {
      byte[] bytes = Decoders.BASE64.decode(jwtSecret);
      this.key = Keys.hmacShaKeyFor(bytes);
      this.jwtParser = Jwts.parser().verifyWith(key).build();
    } catch (Exception e) {
      e.printStackTrace();
      throw e;
    }
  }

  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    return Jwts.builder()
        .claims(claims)
        .subject(userDetails.getUsername())
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
        .signWith(key, Jwts.SIG.HS512)
        .compact();
  }

  private Claims parseJwtClaims(String token) {
    return jwtParser.parseSignedClaims(token).getPayload();
  }

  public Claims resolveClaims(HttpServletRequest req) {
    try {
      String token = resolveToken(req);
      if (token != null) {
        return parseJwtClaims(token);
      }
      return null;
    } catch (ExpiredJwtException ex) {
      req.setAttribute("invalid", ex.getMessage());
      throw ex;
    }
  }

  public UserDetails getUserDetailsFromToken(String token) {
    Claims claims = jwtParser.parseSignedClaims(token).getPayload();
    String username = getUsernameFromToken(claims);
    return userDetailsService.loadUserByUsername(username);
  }

  public String resolveToken(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring("Bearer ".length());
    }
    return null;
  }

  public String getUsernameFromToken(Claims claims) {
    return claims.getSubject();
  }

  public boolean validateClaims(Claims claims) {
    return claims.getExpiration().after(new Date());
  }
}
