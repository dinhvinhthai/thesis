package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import thesis.server.traveling.entity.Comment;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.postId = ?1 and c.replyId = null")
    List<Comment> findCommentByPostId(Long postId);

    List<Comment> findByPostId(Long postId);

    Comment findByCommentId(Long postId);

    List<Comment> findByReplyId(Long replyId);

    List<Comment> findByParentId(Long parentId);

}
