package thesis.server.traveling.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.Random;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendVerifyMail(String toEmail, String code){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(("traveling.project.bot@gmail.com"));
        message.setTo(toEmail);
        message.setSubject("Xác thực tài khoản");
        message.setText("Mã xác thực của bạn là: " + code);
        javaMailSender.send(message);
    }
}
