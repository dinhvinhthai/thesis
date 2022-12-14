package thesis.server.traveling.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class    Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @NotNull
    private Long userId;

    private Long postId;

    private Long parentId;

    private Long replyId;

    private String text;

    // 0: 0FF, 1: 0N
    private String isDelete;

    @NotNull
    private Timestamp regDate;

    @NotNull
    private Timestamp updateDate;

    @Transient
    private Optional<User> user;

    @Transient
    private Optional<User> replyUser;

    @Transient
    private Optional<Image> images;

    @Transient
    private List<Comment> replyComment;
}
