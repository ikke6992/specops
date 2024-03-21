package nl.itvitae.specops.departments;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
  private final DepartmentRepository departmentRepository;

  @GetMapping
  public List<Department> getAll() {
    return departmentService.getAll();
  }

  private record DepartmentCreateData(String name) {}

  @PostMapping("/create")
  public ResponseEntity<Department> create(@RequestBody DepartmentCreateData req) {
    return ResponseEntity.ok(departmentService.save(req.name()));
  }

  @PutMapping("/edit/{id}")
  public ResponseEntity<Department> edit(
      @RequestBody DepartmentCreateData req, @PathVariable UUID id) {
    if (departmentRepository.findById(id).isEmpty()) return ResponseEntity.notFound().build();
    final Department department = departmentRepository.findById(id).get();
    department.setName(req.name());
    return ResponseEntity.ok(departmentRepository.save(department));
  }
}
