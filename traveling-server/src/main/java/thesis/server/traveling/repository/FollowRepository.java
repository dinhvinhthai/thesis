package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Follow;
import thesis.server.traveling.entity.User;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Long countBySourceId(Long sourceId);


    Long countByTargetId(Long targetId);


    List<Follow> findBySourceId(Long sourceId);

    List<Follow> findByTargetId(Long targetId);
}
