package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thesis.server.traveling.constant.SystemConst;
import thesis.server.traveling.entity.Comment;
import thesis.server.traveling.entity.Image;
import thesis.server.traveling.repository.CommentRepository;
import thesis.server.traveling.repository.ImageRepository;
import thesis.server.traveling.repository.UserRepository;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping(value  = "/getAll")
    public List<Comment> getAll(){
        List <Comment> cmList = commentRepository.findAll();
        for(Comment cm : cmList){
            cm.setUser(userRepository.findById(cm.getUserId()));
            cm.setImages(imageRepository.findByCommentId(cm.getCommentId()));
        }
        return cmList;
    }

    @GetMapping(value  = "/getByPostId/{postId}")
    public List<Comment> getByPostId(@PathVariable Long postId){
        List <Comment> cmList = commentRepository.findCommentByPostId(postId);
        for(Comment cm : cmList){
                cm.setUser(userRepository.findById(cm.getUserId()));
                cm.setImages(imageRepository.findByCommentId(cm.getCommentId()));
                cm.setReplyComment(commentRepository.findByParentId(cm.getCommentId()));
                if(!cm.getReplyComment().isEmpty()){
                    List<Comment> scmList =  cm.getReplyComment();
                    for(Comment scm : scmList){
                        Optional<Comment> userCm = commentRepository.findById(scm.getReplyId());
                        scm.setReplyUser(userRepository.findById(userCm.get().getUserId()));
                        scm.setUser(userRepository.findById(scm.getUserId()));
                        scm.setImages(imageRepository.findByCommentId(scm.getCommentId()));
                    }
                }
        }
        return cmList;
    }

    @GetMapping(value  = "/getByReplyId/{replyId}")
    public List<Comment> getByReplyId(@PathVariable Long replyId){
        List <Comment> cmList = commentRepository.findByReplyId(replyId);
        for(Comment cm : cmList){
            cm.setUser(userRepository.findById(cm.getUserId()));
            cm.setImages(imageRepository.findByCommentId(cm.getCommentId()));
        }
        return cmList;
    }

    @PostMapping(value  = "/create")
    public ResponseEntity<Object> create(@RequestPart("comment") Comment comment, @RequestPart("file") @Nullable MultipartFile file) throws IOException {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        comment.setRegDate(now);
        comment.setUpdateDate(now);
        comment.setIsDelete(SystemConst.FLG_OFF);
        commentRepository.save(comment);
        if (file != null && !file.isEmpty()) {
            file.transferTo(new File(SystemConst.UPLOAD_DIRECTORY, file.getOriginalFilename()));
            //update img
            Image img = new Image();
            img.setUserId(comment.getUserId());
            img.setCommentId(comment.getCommentId());
            img.setPath(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
            img.setRegDate(now);
            imageRepository.save(img);
        }
        return new ResponseEntity<Object>(
                "Bình luận thành công.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value  = "/delete")
    public HttpEntity<Object> delete(@RequestBody Comment comment){
        Comment cm =  commentRepository.findByCommentId(comment.getCommentId());
        cm.setIsDelete(SystemConst.FLG_ON);
        commentRepository.save(cm);
        return new ResponseEntity<Object>(
                "Xóa bình luận thành công.", new HttpHeaders(), HttpStatus.OK);
    }

//    @DeleteMapping(value  = "/delete/{commentId}")
//    public HttpEntity<Object> delete(@PathVariable Long commentId){
//        Optional<Comment> cm = commentRepository.findById(commentId);
//        cm.get().setReplyComment(commentRepository.findByParentId(commentId));
//        if(cm.get().getReplyComment() == null){
//            commentRepository.deleteById(commentId);
//        }
//        else {
//            List<Comment> cmList = cm.get().getReplyComment();
//            for(int i = cmList.size() -1 ; i >= 0 ; i--) {
//                commentRepository.deleteById(cmList.get(i).getCommentId());
//            }
//            commentRepository.deleteById(commentId);
//        }
//        return new ResponseEntity<Object>(
//                "Delete success", new HttpHeaders(), HttpStatus.OK);
//    }
}
