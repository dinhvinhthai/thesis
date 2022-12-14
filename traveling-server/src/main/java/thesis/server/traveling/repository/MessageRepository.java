package thesis.server.traveling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import thesis.server.traveling.entity.ChatRoom;
import thesis.server.traveling.entity.Message;

import java.util.List;

@Repository
public interface MessageRepository  extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE m.sendId = ?1 or m.receiveId = ?1")
    List<Message> findBySendIdOrReceiveId(Long userId);
    List<Message> findByChatRoomId(Long userId);

    @Query("SELECT DISTINCT m.chatRoomId FROM Message m WHERE m.sendId = ?1 or m.receiveId = ?1")
    List<Long> findChatRoomByUserId(Long userId);

    Message findByMessageId(Long messageId);

}
