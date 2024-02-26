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

import java.time.LocalDate;

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
    departmentService.save("general", userService.getByName("thomas"));
    departmentService.save("maintenance", userService.getByName("thomas"));
    departmentService.save("chemistry", userService.getByName("peter"));
    departmentService.save("biology", userService.getByName("tuyan"));
  }

  private void assignDepartments() {
    for (int i = 0; i < 5; i++) {
      User employee = userService.getByName("employee" + i);
      employee.setDepartment(departmentService.getByName("general"));
      userRepository.save(employee);
    }
    for (int i = 5; i < 10; i++) {
      User employee = userService.getByName("employee" + i);
      employee.setDepartment(departmentService.getByName("maintenance"));
      userRepository.save(employee);
    }
    for (int i = 10; i < 15; i++) {
      User employee = userService.getByName("employee" + i);
      employee.setDepartment(departmentService.getByName("chemistry"));
      userRepository.save(employee);
    }
    for (int i = 15; i < 20; i++) {
      User employee = userService.getByName("employee" + i);
      employee.setDepartment(departmentService.getByName("biology"));
      userRepository.save(employee);
    }
  }

  private void seedTasks() {
    taskService.save(
        "Clean toilets",
        2,
        7,
        departmentService.getByName("maintenance"),
        LocalDate.now().plusWeeks(1));
    taskService.save(
        "Prepare lunch", 1, 1, departmentService.getByName("general"), LocalDate.now());
    taskService.save(
        "Build machine",
        30,
        365,
        departmentService.getByName("maintenance"),
        LocalDate.now().plusMonths(6));
  }
}
