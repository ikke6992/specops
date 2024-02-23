package nl.itvitae.specops;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.tasks.TaskRepository;
import nl.itvitae.specops.tasks.TaskService;
import nl.itvitae.specops.users.UserRepository;
import nl.itvitae.specops.users.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {
  private final UserRepository userRepository;
  private final UserService userService;
  private final TaskService taskService;
  private final TaskRepository taskRepository;

  private final String[] tasks = {
    "Calibrate equipment",
    "Clean and sterilize lab",
    "Check fire extinguishers",
    "Check eye wash stations",
    "Check first aid kits",
    "Check chemical inventory",
    "Dispose lab waste",
    "Check temperature of refrigerators",
    "Check temperature of freezers",
    "Check temperature of incubators",
    "Inspect glassware",
    "Check ventilation system",
    "Emergency drill"
  };

  @Override
  public void run(String... args) {
    if (userRepository.count() == 0) {
      userService.save("tuyan", "test", "Tuyan Tatliparmak");
      userService.save("peter", "password", "Peter Diepstraten");
      userService.save("thomas", "abc123", "Thomas Vrielink");
    }

    if (taskRepository.count() == 0) {
      /** for (String task : tasks) { taskService.save(task); } */
      taskService.save("Clean toilets", 2, 7, LocalDate.now().plusWeeks(1));
      taskService.save("Prepare lunch", 1, 1, LocalDate.now());
      taskService.save("Build machine", 30, 365, LocalDate.now().plusMonths(6));
    }
  }
}
