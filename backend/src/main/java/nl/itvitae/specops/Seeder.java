package nl.itvitae.specops;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.tasks.TaskRepository;
import nl.itvitae.specops.tasks.TaskService;
import nl.itvitae.specops.users.UserRepository;
import nl.itvitae.specops.users.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {
  private final UserRepository userRepository;
  private final TaskRepository taskRepository;
  private final UserService userService;
  private final TaskService taskService;

  @Override
  public void run(String... args) throws Exception {
    if (userRepository.count() == 0) {
      var userOne = userService.save("tuyan", "test", "Tuyan Tatliparmak");
      var userTwo = userService.save("peter", "password", "Peter Diepstraten");
      var UserThree = userService.save("thomas", "abc123", "Thomas Vrielink");

      var taskOne = taskService.save("Clean toilets");
      var taskTwo = taskService.save("Prepare lunch");
      var taskThree = taskService.save("Build machine");
    }
  }
}
