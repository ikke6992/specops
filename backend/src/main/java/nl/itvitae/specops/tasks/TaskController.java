package nl.itvitae.specops.tasks;

import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.users.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskRepository taskRepository;

    @GetMapping
    public Iterable<Task> getAll() { return taskRepository.findAll(); }
}
