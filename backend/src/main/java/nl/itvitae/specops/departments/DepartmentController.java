package nl.itvitae.specops.departments;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/departments")
@RequiredArgsConstructor
@CrossOrigin
public class DepartmentController {
  private final DepartmentService departmentService;

  @GetMapping
  public List<Department> getAll() {
    return departmentService.getAll();
  }

  private record DepartmentCreateData(String name) {}

  @PostMapping
  public Department create(@RequestBody DepartmentCreateData req) {
    return departmentService.save(req.name());
  }
}
