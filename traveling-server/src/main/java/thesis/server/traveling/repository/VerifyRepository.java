package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Verify;

import java.util.Optional;

@Repository
public interface VerifyRepository extends JpaRepository<Verify, Long> {
    Optional<Verify> findByToken(String token);
}
