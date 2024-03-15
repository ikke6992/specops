package nl.itvitae.specops;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import nl.itvitae.specops.departments.DepartmentRepository;
import nl.itvitae.specops.departments.DepartmentService;
import nl.itvitae.specops.tasks.TaskRepository;
import nl.itvitae.specops.tasks.TaskService;
import nl.itvitae.specops.users.User;
import nl.itvitae.specops.users.UserRepository;
import nl.itvitae.specops.users.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {
  private final UserRepository userRepository;
  private final TaskRepository taskRepository;
  private final DepartmentRepository departmentRepository;

  private final UserService userService;
  private final TaskService taskService;
  private final DepartmentService departmentService;

  @Override
  public void run(String... args) {

    if (userRepository.count() == 0) {
      seedAdmins();
      seedUsers();
    }
    if (departmentRepository.count() == 0) {
      seedDepartments();
      assignDepartments();
    }
    if (taskRepository.count() == 0) {
      seedTasks();
    }
  }

  private void seedAdmins() {
    userService.save("tuyan", "test", "Tuyan Tatliparmak");
    userService.save("peter", "password", "Peter Diepstraten");
    userService.save("thomas", "abc123", "Thomas Vrielink");
  }

  private void seedUsers() {
    for (int i = 0; i < 20; i++) {
      userService.save("employee" + i, "password" + i, "Employee Number " + i);
    }
  }

  private void seedDepartments() {
    try {
      List<String> departments = Files.readAllLines(Paths.get("data/departments.txt"));
      for (String department : departments) {
        departmentService.save(department, userService.getByName("thomas"));
      }
    } catch (IOException e) {
      departmentService.save("general", userService.getByName("thomas"));
      departmentService.save("maintenance", userService.getByName("thomas"));
      departmentService.save("chemistry", userService.getByName("peter"));
      departmentService.save("biology", userService.getByName("tuyan"));
    }
  }

  private void assignDepartments() {

    List<User> employees = userService.getAll();
    List<Department> departments = departmentService.getAll();
    int counter = 0;

    for (User employee : employees) {
      employee.setDepartment(departments.get(counter));
      userRepository.save(employee);
      counter = (counter + 1) % departments.size();
    }
  }

  // interval > timeframe, otherwise you can infinitely repeat tasks.
  private void seedTasks() {

    try {
      List<String> chores = Files.readAllLines(Paths.get("data/tasks.txt"));

      for (String chore : chores) {
        String[] choreArray = chore.split(",");
        taskService.save(
            choreArray[1],
            Integer.parseInt(choreArray[4]),
            Integer.parseInt(choreArray[5]),
            departmentService.getByName(choreArray[0]),
            LocalDate.parse(choreArray[3]));
      }
    } catch (IOException e) {
      taskService.save(
          "Clean toilets",
          2,
          7,
          departmentService.getByName("maintenance"),
          LocalDate.now().plusWeeks(1));
      taskService.save(
          "Prepare lunch", 1, 2, departmentService.getByName("general"), LocalDate.now());
      taskService.save(
          "Build machine",
          30,
          365,
          departmentService.getByName("maintenance"),
          LocalDate.now().plusMonths(6));
    }
  }

  private void seedFromFile() throws IOException {}
}
