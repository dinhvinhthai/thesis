package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.entity.Like;
import thesis.server.traveling.repository.LikeRepository;
import thesis.server.traveling.repository.UserRepository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/like")
public class LikeController {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value  = "/getByPostId/{postId}")
    public List<Like> getByPostId(@PathVariable Long postId){
        List <Like> likeList = likeRepository.findByPostId(postId);
        for(Like  like : likeList){
            like.setUser(userRepository.findById(like.getUserId()));
        }
        return likeList;
    }

    @GetMapping(value  = "/getByCommentId/{commentId}")
    public List<Like> getByCommentId(@PathVariable Long commentId){
        List <Like> likeList = likeRepository.findByCommentId(commentId);
        for(Like  like : likeList){
            like.setUser(userRepository.findById(like.getUserId()));
        }
        return likeList;
    }


    @PostMapping(value  = "/likePost")
    public Like likePost(@RequestBody Like like) {
        List<Like> likeList = likeRepository.findByUserId(like.getUserId());
        Timestamp now = new Timestamp(System.currentTimeMillis());
        like.setRegDate(now);
        return likeRepository.save(like);
    }

    @DeleteMapping(value  = "/unLikePost/{likeId}")
    public HttpEntity<Object> unLikePost(@PathVariable Long likeId){
        likeRepository.deleteById(likeId);
        return new ResponseEntity<Object>(
                "Unlike success", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value  = "/likeComment")
    public Like likeComment(@RequestBody Like like) {
        List<Like> likeList = likeRepository.findByUserId(like.getUserId());
        Timestamp now = new Timestamp(System.currentTimeMillis());
        like.setRegDate(now);
        return likeRepository.save(like);
    }

    @DeleteMapping(value  = "/unLikeComment/{likeId}")
    public HttpEntity<Object> unLikeComment(@PathVariable Long likeId){
        likeRepository.deleteById(likeId);
        return new ResponseEntity<Object>(
                "Unlike success", new HttpHeaders(), HttpStatus.OK);
    }
}
