package thesis.server.traveling.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @NotNull
    private Long sendId;

    @NotNull
    private Long receiveId;

    @NotNull
    private Long chatRoomId;

    private String text;

    private String isDelete;

    private String file;

    private String image;

    private String video;

    @NotNull
    private Timestamp regDate;

    @Transient
    private User user;
}
