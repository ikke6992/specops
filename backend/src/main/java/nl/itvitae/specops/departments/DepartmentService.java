package nl.itvitae.specops.departments;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.users.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {
  private final DepartmentRepository departmentRepository;

  public List<Department> getAll() {
    return departmentRepository.findAll();
  }

  public Department save(String name) {
    return departmentRepository.save(new Department(name));
  }

  // One warning, fine for now.
  public Department getByName(String name) {
    return departmentRepository.findByName(name).get();
  }
}
