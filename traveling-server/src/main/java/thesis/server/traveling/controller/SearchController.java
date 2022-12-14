package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.entity.Post;
import thesis.server.traveling.entity.User;
import thesis.server.traveling.entity.Video;
import thesis.server.traveling.repository.ImageRepository;
import thesis.server.traveling.repository.PostRepository;
import thesis.server.traveling.repository.UserRepository;
import thesis.server.traveling.repository.VideoRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private VideoRepository videoRepository;

    @GetMapping(value = "/searchUser/{keyword}")
    public List<User> searchUser(@PathVariable String keyword) {
        return userRepository.findByNameContainingIgnoreCase(keyword);
    }

    @GetMapping(value = "/searchPost/{keyword}")
    public List<Post> searchPost(@PathVariable String keyword) {
        List<Post> postList = postRepository.findByTextContainingIgnoreCase(keyword);
        for(Post post : postList){
            post.setImages(imageRepository.findByPostId(post.getPostId()));
            post.setVideos(videoRepository.findByPostId(post.getPostId()));
        }
        return postList;
    }
}
