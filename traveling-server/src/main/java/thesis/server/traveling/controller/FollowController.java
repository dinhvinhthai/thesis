package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.entity.Follow;
import thesis.server.traveling.entity.User;
import thesis.server.traveling.repository.FollowRepository;
import thesis.server.traveling.repository.UserRepository;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/follow")
public class    FollowController {
    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value  = "/getAll")
    public List<Follow> getAll(){
        return followRepository.findAll();
    }

    @GetMapping(value  = "/getFollow/{sourceId}")
    public List<Follow> getFollow(@PathVariable Long sourceId){
        return followRepository.findBySourceId(sourceId);
    }

    @GetMapping(value  = "/countBySourceId/{sourceId}")
    public Long countBySourceId(@PathVariable Long sourceId){
        return followRepository.countBySourceId(sourceId);
    }

    @GetMapping(value  = "/countByTargetId/{targetId}")
    public Long countByTargetId(@PathVariable Long targetId){
        return followRepository.countByTargetId(targetId);
    }

    @GetMapping(value  = "/getFriendById/{userId}")
    public List<User> getFriendById(@PathVariable Long userId){
        List<Follow> followList = followRepository.findBySourceId(userId);
        List<Follow> followTargetList = new ArrayList<>();
        List<User> userList = new ArrayList<>();
        for(Follow fl : followList){
            followTargetList = followRepository.findBySourceId(fl.getTargetId());
            for(Follow fl2 : followTargetList){
                if(fl.getSourceId().equals(fl2.getTargetId())){
                    userList.add(userRepository.findByUserId(fl2.getSourceId()));
                }
            }
        }
        return userList;
    }

    @GetMapping(value  = "/getFollowingById/{userId}")
    public List<User> getFollowingById(@PathVariable Long userId){
        List<Follow> followList = followRepository.findBySourceId(userId);
        List<User> userList = new ArrayList<>();
        for(Follow fl : followList){
            userList.add(userRepository.findByUserId(fl.getTargetId()));
        }
        return userList;
    }

    @GetMapping(value  = "/getFollowerById/{userId}")
    public List<User> getFollowerById(@PathVariable Long userId){
        List<Follow> followList = followRepository.findByTargetId(userId);
        List<User> userList = new ArrayList<>();
        for(Follow fl : followList){
            userList.add(userRepository.findByUserId(fl.getSourceId()));
        }
        return userList;
    }

    @PostMapping(value  = "/create")
    public ResponseEntity<Object> create(@RequestBody Follow follow) throws IOException {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        follow.setRegDate(now);
        followRepository.save(follow);
        return new ResponseEntity<Object>(
                "Theo dõi thành công", new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping (value  = "/delete/{sourceId}/{targetId}")
    public ResponseEntity<Object> delete(@PathVariable("sourceId") Long sourceId, @PathVariable("targetId") Long targetId) throws IOException {
        List<Follow> followList = followRepository.findBySourceId(sourceId);
        for(Follow follow : followList){
            if(follow.getTargetId() == targetId){
                followRepository.deleteById(follow.getFollowId());
            }
        }
        return new ResponseEntity<Object>(
                "Unfollow user success", new HttpHeaders(), HttpStatus.OK);
    }
}
