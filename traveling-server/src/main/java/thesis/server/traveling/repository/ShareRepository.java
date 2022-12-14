package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Like;
import thesis.server.traveling.entity.Share;

import java.util.List;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {
    List<Share> findByUserId(Long userId);

    List<Share> findByPostId(Long postId);
    @Query("SELECT s FROM Share s WHERE s.userId = ?1 and s.postId = ?2")
    Share findByUserIdAndPostId(Long userId, Long postId);
}
