package thesis.server.traveling.controller;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thesis.server.traveling.constant.SystemConst;
import thesis.server.traveling.entity.*;
import thesis.server.traveling.repository.ChatRoomRepository;
import thesis.server.traveling.repository.MessageRepository;
import thesis.server.traveling.repository.UserRepository;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value = "/api/message")
public class ChatController {
    @Autowired
    MessageRepository messageRepository;

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value  = "/getAllChatRoomByUser/{userId}")
    public List<ChatRoom> getAllChatRoomByUser(@PathVariable Long userId){
        List<Long> chatRoomIds = messageRepository.findChatRoomByUserId(userId);
        List<ChatRoom> chatRooms = new ArrayList<>();
        for(Long id : chatRoomIds){
            chatRooms.add(getChatRoom(id));
        }
        for(ChatRoom chatRoom : chatRooms){
            if(chatRoom.getMessages().size() > 0){
                for(Message message : chatRoom.getMessages()){
                    if(message.getReceiveId().equals(userId)){
                        message.setUser(userRepository.findByUserId(message.getSendId()));
                    } else {
                        message.setUser(userRepository.findByUserId(message.getReceiveId()));
                    }
                }
            }
        }
        return chatRooms;
    }

    @GetMapping(value  = "/getChatRoom/{chatRoomId}")
    public ChatRoom getChatRoom(@PathVariable Long chatRoomId){
        ChatRoom chatRoom = chatRoomRepository.findByChatRoomId(chatRoomId);
        List<Message> messages  = messageRepository.findByChatRoomId(chatRoomId);
        chatRoom.setMessages(messages);
        List<User> users = new ArrayList<>();
        users.add(userRepository.findByUserId(messages.get(0).getSendId()));
        users.add(userRepository.findByUserId(messages.get(0).getReceiveId()));
        chatRoom.setUsers(users);
        return chatRoom;
    }

//    @GetMapping(value  = "/findByUserId/{userId}")
//    public List<Message> findByUserId(@PathVariable Long userId){
////        return messageRepository.findById();
//    }

    @PostMapping(value  = "/create")
    public ResponseEntity<Object> create(@RequestPart Message message, @RequestPart("file") @Nullable MultipartFile file, @RequestPart("type") @Nullable String type) throws IOException {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        message.setRegDate(now);
        messageRepository.save(message);
        //update img, video, file
        if(file != null && !file.isEmpty()){
            file.transferTo(new File(SystemConst.UPLOAD_DIRECTORY + file.getOriginalFilename()));
            if(type.equals("img")){
                    message.setImage(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
            } else if(type.equals("video")){
                message.setVideo(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
            } else {
                message.setFile(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
            }
        }
        message.setIsDelete(SystemConst.FLG_OFF);
        messageRepository.save(message);
        return new ResponseEntity<Object>(
                "Gửi tin nhắn thành công", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value  = "/createChatRoom")
    public ResponseEntity<Object> createChatRoom( @RequestBody Message mess) {
        ChatRoom chatRoom = new ChatRoom();
        Timestamp now = new Timestamp(System.currentTimeMillis());
        chatRoom.setRegDate(now);
        chatRoomRepository.save(chatRoom);
        Message message = new Message();
        message.setChatRoomId(chatRoom.getChatRoomId());
        message.setSendId(mess.getSendId());
        message.setReceiveId(mess.getReceiveId());
        message.setRegDate(now);
        messageRepository.save(message);
        return new ResponseEntity<Object>(
                "Tạo phòng thành công", new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping(value  = "/delete/{messageId}")
    public ResponseEntity<Object> delete( @PathVariable Long messageId) throws IOException {
        Message message = messageRepository.findByMessageId(messageId);
        message.setIsDelete(SystemConst.FLG_ON);
        messageRepository.save(message);
        return new ResponseEntity<Object>(
                "Đã xóa tin nhắn", new HttpHeaders(), HttpStatus.OK);
    }

    @MessageMapping("/message")
    @SendTo("room/public")
    public Message sendMessage(@Payload Message message){
        return message;
    }

    @DeleteMapping("/deleteChatRoom/{chatRoomId}")
    public ResponseEntity<Object> deleteChatRoom(@PathVariable Long chatRoomId) {
        List<Message> messageList = messageRepository.findByChatRoomId(chatRoomId);
        for(Message message : messageList){
            messageRepository.deleteById(message.getMessageId());
        }
        chatRoomRepository.deleteById(chatRoomId);
        return new ResponseEntity<Object>(
                "Xóa hộp thoại thành công", new HttpHeaders(), HttpStatus.OK);
    }
}
