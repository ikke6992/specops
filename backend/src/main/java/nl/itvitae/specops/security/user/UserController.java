package nl.itvitae.specops.security.user;

import nl.itvitae.specops.security.dto.LoginRequest;
import nl.itvitae.specops.security.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {
  @Autowired UserRepository userRepository;
  @Autowired UserService userService;

  @GetMapping("/findAll")
  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  @PostMapping("/register")
  public LoginResponse make(@RequestBody LoginRequest req) {
    return userService.register(req);
  }

  @PostMapping("/login")
  public LoginResponse login(@RequestBody LoginRequest req) {
    return userService.login(req);
  }

  //  @PatchMapping("/addComp/{usr}/{cmp}")
  //  public User addComp(@PathVariable(name = "usr") Long usr, @PathVariable(name = "cmp") Long
  // cmp) {
  //    User user = userRepository.findById(usr).get();
  //    Company company = companyRepository.findById(cmp).get();
  //    user.setCompany(company);
  //    return userRepository.save(user);
  //  }
}
