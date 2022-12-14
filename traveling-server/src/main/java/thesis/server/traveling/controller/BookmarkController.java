package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.entity.*;
import thesis.server.traveling.repository.BookmarkRepository;
import thesis.server.traveling.repository.ImageRepository;
import thesis.server.traveling.repository.PostRepository;
import thesis.server.traveling.repository.VideoRepository;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value = "/api/bookmark")
public class BookmarkController {
    @Autowired
    BookmarkRepository bookmarkRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    VideoRepository videoRepository;

    @GetMapping(value  = "/getAll")
    public List<Bookmark> getAll(){
        return bookmarkRepository.findAll();
    }

    @GetMapping(value  = "/findByUserId/{userId}")
    public List<Post> findByUserId(@PathVariable Long userId){
        List<Bookmark> bmList = bookmarkRepository.findByUserId(userId);
        List<Post> postList = new ArrayList<>();
       for(int i = bmList.size() -1 ; i >= 0 ; i--) {
            postList.add(postRepository.findByPostId(bmList.get(i).getPostId()));
        }
        for(Post post : postList){
            post.setImages(imageRepository.findByPostId(post.getPostId()));
            post.setVideos(videoRepository.findByPostId(post.getPostId()));
        }
        return postList;
    }

    @PostMapping(value  = "/create")
    public ResponseEntity<Object> create(@RequestBody Bookmark bookmark) {
        int count = bookmarkRepository.countByUserIdAndPostId(bookmark.getUserId(), bookmark.getPostId());
        if(count > 0){
            return new ResponseEntity<Object>(
                    "Đã lưu bài viết này rồi.", new HttpHeaders(), HttpStatus.OK);
        }
        Timestamp now = new Timestamp(System.currentTimeMillis());
        bookmark.setRegDate(now);
        bookmarkRepository.save(bookmark);
        return new ResponseEntity<Object>(
                "Đã lưu bài viết", new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping(value  = "/delete/{userId}/{postId}")
    public ResponseEntity<Object> delete( @PathVariable Long userId, @PathVariable Long postId) throws IOException {
        Bookmark bm = bookmarkRepository.findByUserIdAndPostId(userId, postId);
        bookmarkRepository.delete(bm);
        return new ResponseEntity<Object>(
                "Bỏ lưu thành công.", new HttpHeaders(), HttpStatus.OK);
    }
}
