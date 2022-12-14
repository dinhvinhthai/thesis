package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.Message;
import thesis.server.traveling.entity.Notification;

import java.util.List;

@Repository
public interface NotificationRepository  extends JpaRepository<Notification, Long> {

    List<Notification> findByTargetId(Long notificationId);
}
