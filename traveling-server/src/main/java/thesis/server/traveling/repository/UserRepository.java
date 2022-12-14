package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Post;
import thesis.server.traveling.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface  UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByUserId(Long userId);

    List<User> findByNameContainingIgnoreCase(String keyword);
}