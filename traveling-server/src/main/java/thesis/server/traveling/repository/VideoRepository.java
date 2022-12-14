package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Image;
import thesis.server.traveling.entity.Video;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    Video findByPostId(Long postId);

    List<Video> findByUserId(Long userId);

}
