package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Report;
import thesis.server.traveling.entity.Share;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByPostId(Long postId);

    Report findByReportId(Long reportId);
}
