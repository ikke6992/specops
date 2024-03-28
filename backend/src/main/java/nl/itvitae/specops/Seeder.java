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
      taskService.execute(taskRepository.findAll().get(0), userRepository.findAll().get(0), "Test");
    }
  }

  private void seedAdmins() {
    userService.save("TuyanTat", "TuyanTat123", "ROLE_USER", "Tuyan Tatliparmak");
    userService.save("PeterDiep", "PeterDiep123", "ROLE_USER,ROLE_MANAGER", "Peter Diepstraten");
    userService.save(
        "ThomasVrie", "ThomasVrie123", "ROLE_USER,ROLE_MANAGER,ROLE_ADMIN", "Thomas Vrielink");
  }

  private void seedUsers() {
    for (int i = 0; i < 20; i++) {
      userService.save("employee" + i, "Employee" + i, "ROLE_USER", "Employee Number " + i);
    }
  }

  private void seedDepartments() {
    /**
     * try { List<String> departments = Files.readAllLines(Paths.get("data/departments.txt")); for
     * (String department : departments) { departmentService.save(department); } } catch
     * (IOException e) {
     */
    departmentService.save("general");
    departmentService.save("maintenance");
    departmentService.save("chemistry");
    departmentService.save("biology");
    // }
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

    /**
     * try { List<String> chores = Files.readAllLines(Paths.get("data/tasks.txt"));
     *
     * <p>for (String chore : chores) { String[] choreArray = chore.split(","); taskService.save(
     * choreArray[1], Integer.parseInt(choreArray[4]), Integer.parseInt(choreArray[5]),
     * departmentService.getByName(choreArray[0]), LocalDate.parse(choreArray[3])); } } catch
     * (IOException e) {
     */
    taskService.save(
        "Clean toilets",
        2,
        7,
        departmentService.getByName("maintenance"),
        LocalDate.now().plusWeeks(1));
    taskService.save(
        "Prepare lunch",
        1,
        2,
        departmentService.getByName("general"),
        LocalDate.now().minusDays(3));
    taskService.save(
        "Build machine",
        30,
        365,
        departmentService.getByName("maintenance"),
        LocalDate.now().plusMonths(6));
    taskService.save(
        "Progress Bar",
        10,
        365,
        departmentService.getByName("maintenance"),
        LocalDate.now().plusDays(4));
    // }
  }

  // private void seedFromFile() throws IOException {}
}
