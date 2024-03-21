package nl.itvitae.specops.users;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRequestRepository extends JpaRepository<UserRequest, UUID> {}
