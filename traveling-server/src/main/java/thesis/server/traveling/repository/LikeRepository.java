package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Like;
import thesis.server.traveling.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByUserId(Long userId);

    List<Like> findByPostId(Long postId);

    List<Like> findByCommentId(Long commentId);


}
