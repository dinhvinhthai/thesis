package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thesis.server.traveling.constant.SystemConst;
import thesis.server.traveling.entity.Verify;
import thesis.server.traveling.repository.VerifyRepository;
import thesis.server.traveling.service.EmailSenderService;
import thesis.server.traveling.entity.User;
import thesis.server.traveling.payload.AuthRequest;
import thesis.server.traveling.payload.AuthResponse;
import thesis.server.traveling.repository.UserRepository;
import thesis.server.traveling.service.VerificationService;
import thesis.server.traveling.util.JwtTokenUtil;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtTokenUtil jwtUtil;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    VerifyRepository verifyRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private VerificationService verificationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest loginRequest) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(), loginRequest.getPassword())
            );
            User user = (User) authentication.getPrincipal();
            if(user.getStatus().equals(SystemConst.USER_STATUS_LOCKED)){
                return new ResponseEntity<Object>(
                        "Tài khoản của bạn đã bị khóa vì vi phạm.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
            }
            String accessToken = jwtUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getUserId(), user.getEmail(), user.getName(), user.getStatus(), user.getAvatarSrc(), accessToken);
            return ResponseEntity.ok().body(response);
        } catch (BadCredentialsException ex) {
            return new ResponseEntity<Object>(
                    "Email hoặc mật khẩu không chính xác.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity<Object> register(@RequestBody User user) throws IOException {
        Optional<User> exist = userRepository.findByEmail(user.getEmail());
        if (!exist.isEmpty()) {
            return new ResponseEntity<Object>(
                    "Email đã được đăng ký.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        user.setPassword(encoder.encode(user.getPassword()));
        // Non-Vertify
        user.setStatus(SystemConst.USER_STATUS_NON_VERIFY);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        user.setRegDate(now);
        user.setUpdateDate(now);
        String code = verificationService.verifyCode().toUpperCase();
        emailSenderService.sendVerifyMail(user.getEmail(), code);
        userRepository.save(user);
        saveVerifyCode(user.getEmail(), code);
        return new ResponseEntity<Object>(
                "Success in register.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/forgotPassword/{email}")
    public ResponseEntity<Object> forgotPassword(@PathVariable String email) throws IOException {
        Optional<User> exist = userRepository.findByEmail(email);
        if (exist.isEmpty()) {
            return new ResponseEntity<Object>(
                    "Email không tồn tại.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        String code = verificationService.verifyCode().toUpperCase();
        emailSenderService.sendVerifyMail(exist.get().getEmail(), code);
        saveVerifyCode(exist.get().getEmail(), code);
        return new ResponseEntity<Object>(
                "Đã gửi mã xác thực.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/verifyPassword")
    public ResponseEntity<Object> verifyPassword(@RequestBody Verify verify) throws IOException {
        Optional<Verify> ver = verifyRepository.findByToken(verify.getToken());
        if (ver.isEmpty()) {
            return new ResponseEntity<Object>(
                    "Verify codes do not exist.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        verifyRepository.delete(ver.get());
        return new ResponseEntity<Object>(
                "Verify success.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/newPassword/{email}")
    public ResponseEntity<Object> newPassword(@PathVariable String email, @RequestBody List<String> password) throws IOException {
        Optional<User> exist = userRepository.findByEmail(email);
        exist.get().setPassword(encoder.encode(password.get(0)));
        userRepository.save(exist.get());
        return new ResponseEntity<Object>(
                "Verify success.", new HttpHeaders(), HttpStatus.OK);
    }

    public void saveVerifyCode(String email, String code) {
        Optional<User> user = userRepository.findByEmail(email);
        Verify ver = new Verify();
        ver.setUserId(user.get().getUserId());
        ver.setToken(code);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        ver.setRegDate(now);
        verifyRepository.save(ver);
    }

    @PostMapping(value = "/verify")
    public ResponseEntity<Object> verify(@RequestBody Verify verify) throws IOException {
        Optional<Verify> ver = verifyRepository.findByToken(verify.getToken());
        if (ver.isEmpty()) {
            return new ResponseEntity<Object>(
                    "Verify codes do not exist.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        Optional<User> user = userRepository.findById(ver.get().getUserId());
        user.get().setStatus(SystemConst.USER_STATUS_NON_SETUP);
        userRepository.save(user.get());
        verifyRepository.delete(ver.get());
        return new ResponseEntity<Object>(
                "Verify success.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/createProfile")
    public ResponseEntity<Object> createProfile(@RequestPart User user, @RequestPart @Nullable MultipartFile file) throws IOException {
        Optional<User> userOld = userRepository.findByEmail(user.getEmail());
        Timestamp now = new Timestamp(System.currentTimeMillis());
        userOld.get().setUpdateDate(now);
        userOld.get().setName(user.getName());
        userOld.get().setGender(user.getGender());
        userOld.get().setBirthday(user.getBirthday());
        userOld.get().setStatus(SystemConst.USER_STATUS_NORMAL);
        //update avatar
        if(file != null && !file.isEmpty()){
            file.transferTo(new File(SystemConst.UPLOAD_DIRECTORY, file.getOriginalFilename()));
            userOld.get().setAvatarSrc(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
        } else {
            userOld.get().setAvatarSrc(SystemConst.UPLOAD_LOCATION + "default-avatar-12yx2.png");
        }
        userRepository.save(userOld.get());
        return new ResponseEntity<Object>(
                "Create profile success", new HttpHeaders(), HttpStatus.OK);
    }

}
