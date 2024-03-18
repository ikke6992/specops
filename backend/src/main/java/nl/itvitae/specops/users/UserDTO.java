package nl.itvitae.specops.users;

import java.util.UUID;

public record UserDTO(UUID id, String username) {
    public UserDTO(User user) {
        this(user.getId(), user.getUsername());
    }
}
