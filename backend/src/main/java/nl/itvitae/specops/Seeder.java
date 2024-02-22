package nl.itvitae.specops;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.tasks.TaskService;
import nl.itvitae.specops.users.UserRepository;
import nl.itvitae.specops.users.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {
  private final UserRepository userRepository;
  private final UserService userService;
  private final TaskService taskService;

  @Override
  public void run(String... args) {
    if (userRepository.count() == 0) {
      userService.save("tuyan", "test", "Tuyan Tatliparmak");
      userService.save("peter", "password", "Peter Diepstraten");
      userService.save("thomas", "abc123", "Thomas Vrielink");

      taskService.save("Clean toilets", "Tuyan Tatliparmak");
      taskService.save("Prepare lunch", "Peter Diepstraten");
      taskService.save("Build machine", "Thomas Vrielink");
    }
  }
}
