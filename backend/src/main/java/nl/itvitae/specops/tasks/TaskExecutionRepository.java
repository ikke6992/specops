package nl.itvitae.specops.tasks;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskExecutionRepository extends JpaRepository<TaskExecution, UUID> {}
