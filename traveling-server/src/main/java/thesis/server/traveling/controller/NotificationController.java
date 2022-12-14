package thesis.server.traveling.controller;

import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.entity.Like;
import thesis.server.traveling.entity.Notification;
import thesis.server.traveling.entity.Share;
import thesis.server.traveling.repository.NotificationRepository;
import thesis.server.traveling.repository.UserRepository;

import java.sql.Timestamp;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/notification")
public class NotificationController {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value  = "/getAllByUserId/{userId}")
    public List<Notification> getAllByUserId(@PathVariable Long userId){
        List<Notification> notifications = notificationRepository.findByTargetId(userId);
        for(Notification noti : notifications){
            noti.setUser(userRepository.findByUserId(noti.getSourceId()));
        }
        return notifications;
    }

    @PostMapping(value  = "/create")
    public Notification create(@RequestBody Notification notification) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        notification.setRegDate(now);
        return notificationRepository.save(notification);
    }

    @DeleteMapping(value  = "/delete/{notifyId}")
    public HttpEntity<Object> delete(@PathVariable Long notifyId){
        notificationRepository.deleteById(notifyId);
        return new ResponseEntity<Object>(
                "Đã xóa thông báo.", new HttpHeaders(), HttpStatus.OK);
    }
}
