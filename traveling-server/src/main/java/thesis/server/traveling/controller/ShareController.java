package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.entity.Comment;
import thesis.server.traveling.entity.Post;
import thesis.server.traveling.entity.Share;
import thesis.server.traveling.repository.PostRepository;
import thesis.server.traveling.repository.ShareRepository;
import thesis.server.traveling.repository.UserRepository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/share")
public class ShareController {
    @Autowired
    private ShareRepository shareRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping(value  = "/getAllShare")
    public List<Share> getAllShare(){
        return shareRepository.findAll();
    }

    @GetMapping(value  = "/getByPostId/{postId}")
    public List<Share> getByPostId(@PathVariable Long postId){
        List <Share> shareList = shareRepository.findByPostId(postId);
        for(Share share : shareList){
            share.setUser(userRepository.findById(share.getUserId()));
        }
        return shareRepository.findByPostId(postId);
    }

    @PostMapping(value  = "/create")
    public ResponseEntity<Object> create(@RequestBody Share share) {
        List<Share> shareList = shareRepository.findByUserId(share.getUserId());
        for(Share sh : shareList){
            if(sh.getPostId().equals(share.getPostId())){
                return null;
            }
        }
        Timestamp now = new Timestamp(System.currentTimeMillis());
        share.setRegDate(now);
        shareRepository.save(share);
        return new ResponseEntity<Object>(
                "Chia sẻ thành công", new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping(value  = "/delete/{userId}/{postId}")
    public ResponseEntity<Object> delete(@PathVariable Long userId, @PathVariable Long postId){
        Share share = shareRepository.findByUserIdAndPostId(userId, postId);
        shareRepository.deleteById(share.getShareId());
        return new ResponseEntity<Object>(
                "Đã hủy chia sẻ", new HttpHeaders(), HttpStatus.OK);
    }
}
