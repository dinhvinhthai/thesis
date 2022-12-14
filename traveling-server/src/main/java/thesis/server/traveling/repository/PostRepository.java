package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Post;
import thesis.server.traveling.entity.User;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);

    Post findByPostId(Long userId);


    @Query(value = "SELECT p FROM Post p WHERE p.userId in :list")
    List<Post> findByUserListId(@Param("list") List<Long> userId);

    List<Post> findByTextContainingIgnoreCase(String keyword);

    Long countByUserId(Long userId);

}
