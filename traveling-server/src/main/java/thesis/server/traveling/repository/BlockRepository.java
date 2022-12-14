package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import thesis.server.traveling.entity.Block;

import java.util.List;

public interface BlockRepository  extends JpaRepository<Block, Long> {

    List<Block> findBySourceId(Long sourceId);

    @Query("SELECT DISTINCT b FROM Block b WHERE b.sourceId = ?1 or b.targetId = ?1")
    List<Block> findBySourceIdOrTargetId(Long userId);

}
