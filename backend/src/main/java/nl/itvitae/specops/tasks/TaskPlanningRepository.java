package nl.itvitae.specops.tasks;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskPlanningRepository extends JpaRepository<TaskPlanning, UUID> {}
