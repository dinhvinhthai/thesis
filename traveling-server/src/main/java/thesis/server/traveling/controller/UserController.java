package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thesis.server.traveling.constant.SystemConst;
import thesis.server.traveling.entity.Follow;
import thesis.server.traveling.entity.User;
import thesis.server.traveling.repository.FollowRepository;
import thesis.server.traveling.repository.PostRepository;
import thesis.server.traveling.repository.UserRepository;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private FollowRepository followRepository;

    @GetMapping(value  = "/getAll")
    public List<User> getAll(){
        return userRepository.findAll();
    }

    @GetMapping(value  = "/getById/{userId}")
    public Optional<User> getById(@PathVariable Long userId){
        Optional<User> user = userRepository.findById(userId);
        List<Long>  statistics = new ArrayList<>();
        statistics.add(postRepository.countByUserId(userId));
        statistics.add(followRepository.countBySourceId(userId));
        statistics.add(followRepository.countByTargetId(userId));
        user.get().setStatistics(statistics);
        return user;
    }

    @PostMapping(value  = "/create")
    public User create(@RequestBody @Valid User user) {
//        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @PostMapping(value  = "/updateIntroduce/{userId}")
    public User updateIntroduce(@PathVariable Long userId, @RequestBody String introduce) {
        User findUser = userRepository.findByUserId(userId);
        findUser.setIntroduce(introduce);
        return userRepository.save(findUser);
    }

    @PostMapping(value  = "/update")
    public User update(@RequestBody User user) {
        User oldUser = userRepository.findByUserId(user.getUserId());
        if(user.getName() != null){
            oldUser.setName(user.getName());
        }
        if(user.getBirthday() != null){
            oldUser.setBirthday(user.getBirthday());
        }
        if(user.getGender() != null){
            oldUser.setGender(user.getGender());
        }
        if(user.getJob() != null){
            oldUser.setJob(user.getJob());
        }
        if(user.getCountry() != null){
            oldUser.setCountry(user.getCountry());
        }
        if(user.getPhone() != null){
            oldUser.setPhone(user.getPhone());
        }
        if(user.getAddress() != null){
            oldUser.setAddress(user.getAddress());
        }
        if(user.getStory() != null){
            oldUser.setStory(user.getStory());
        }
        return userRepository.save(oldUser);
    }

    @PostMapping(value  = "/changePassword/{userId}")
    public ResponseEntity<Object> changePassword(@PathVariable Long userId, @RequestBody List<String> password) {
        User oldUser = userRepository.findByUserId(userId);
        if(!encoder.matches(password.get(0), oldUser.getPassword())){
            return new ResponseEntity<Object>(
                    "Mật khẩu không chính xác.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        oldUser.setPassword(encoder.encode(password.get(1)));
        userRepository.save(oldUser);
        return new ResponseEntity<Object>(
                "Đổi mật khẩu thành công.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/updateAvatar/{userId}")
    public ResponseEntity<Object> createProfile(@PathVariable Long userId, @RequestPart @Nullable MultipartFile file) throws IOException {
        User oldUser = userRepository.findByUserId(userId);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        oldUser.setUpdateDate(now);
        //update avatar
        if(file != null && !file.isEmpty()){
            file.transferTo(new File(SystemConst.UPLOAD_DIRECTORY, file.getOriginalFilename()));
            oldUser.setAvatarSrc(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
        } else {
            oldUser.setAvatarSrc(SystemConst.UPLOAD_LOCATION + "default-avatar-12yx2.png");
        }
        userRepository.save(oldUser);
        return new ResponseEntity<Object>(
                "Cập nhật thành công.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/updateBackground/{userId}")
    public ResponseEntity<Object> updateBackground(@PathVariable Long userId, @RequestPart @Nullable MultipartFile file) throws IOException {
        User oldUser = userRepository.findByUserId(userId);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        oldUser.setUpdateDate(now);
        //update avatar
        if(file != null && !file.isEmpty()){
            file.transferTo(new File(SystemConst.UPLOAD_DIRECTORY, file.getOriginalFilename()));
            oldUser.setBackgroundSrc(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
            userRepository.save(oldUser);
            return new ResponseEntity<Object>(
                    "Cập nhật thành công.", new HttpHeaders(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Object>(
                    "Lỗi hệ thống.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/updateIsOffline")
    public ResponseEntity<Object> updateIsOffline(@RequestBody User user) throws IOException {
        User oldUser = userRepository.findByUserId(user.getUserId());
        oldUser.setIsOnline("0");
        userRepository.save(oldUser);
        return new ResponseEntity<Object>(
                "Offline", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/updateIsOnline")
    public ResponseEntity<Object> updateIsOnline(@RequestBody User user) throws IOException {
        User oldUser = userRepository.findByUserId(user.getUserId());
        oldUser.setIsOnline("1");
        userRepository.save(oldUser);
        return new ResponseEntity<Object>(
                "Online", new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping(value  = "/getPopularUser/{userId}")
    public List<User> getPopularUser(@PathVariable Long userId){
        List<User> userList = userRepository.findAll();
        List<Follow> followList = followRepository.findBySourceId(userId);
        for(Follow fl : followList){
            for(int i =0 ; i< userList.size(); i++){
                if(fl.getTargetId() == userList.get(i).getUserId()){
                    userList.remove(i);
                }
            }
        }
        for(User user: userList){
            user.setPostCount(postRepository.countByUserId(user.getUserId()));
            user.setFollowCount(followRepository.countByTargetId(user.getUserId()));
        }
        return userList;
    }

    @PostMapping(value = "/lockUser")
    public ResponseEntity<Object> lockUser(@RequestBody User user) throws IOException {
        User oldUser = userRepository.findByUserId(user.getUserId());
        oldUser.setStatus(SystemConst.USER_STATUS_LOCKED);
        userRepository.save(oldUser);
        return new ResponseEntity<Object>(
                "Đã khóa tài khoản người dùng.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/unlockUser")
    public ResponseEntity<Object> unlockUser(@RequestBody User user) throws IOException {
        User oldUser = userRepository.findByUserId(user.getUserId());
        oldUser.setStatus(SystemConst.USER_STATUS_NORMAL);
        userRepository.save(oldUser);
        return new ResponseEntity<Object>(
                "Đã mở khóa tài khoản người dùng.", new HttpHeaders(), HttpStatus.OK);
    }
}
