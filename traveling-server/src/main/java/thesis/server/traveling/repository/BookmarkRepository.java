package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Bookmark;
import thesis.server.traveling.entity.Comment;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    List<Bookmark> findByUserId(Long userId);

    List<Bookmark> findByPostId(Long postId);

    @Query("SELECT b FROM Bookmark b WHERE b.userId = ?1 and b.postId = ?2")
    Bookmark findByUserIdAndPostId(Long userId, Long postId);

    @Query("SELECT COUNT(b) FROM Bookmark b WHERE b.userId = ?1 and b.postId = ?2")
    int countByUserIdAndPostId(Long userId, Long postId);

}
