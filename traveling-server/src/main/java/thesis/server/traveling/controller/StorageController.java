package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.entity.Image;
import thesis.server.traveling.entity.User;
import thesis.server.traveling.entity.Video;
import thesis.server.traveling.repository.ImageRepository;
import thesis.server.traveling.repository.UserRepository;
import thesis.server.traveling.repository.VideoRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/storage")
public class StorageController {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private VideoRepository videoRepository;

    @GetMapping(value  = "/getMyImages/{userId}")
    public List<Image> getMyImages(@PathVariable Long userId){
        return imageRepository.findByUserId(userId);
    }

    @GetMapping(value  = "/getMyVideos/{userId}")
    public List<Video> getMyVideos(@PathVariable Long userId){
        return videoRepository.findByUserId(userId);
    }
}
