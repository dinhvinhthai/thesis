package thesis.server.traveling.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @NotNull
    private Long userId;

    private String text;

    @NotNull
    // 0: Public, 1: Follow, 2: Private
    private String status;

    @NotNull
    private Timestamp regDate;

    @NotNull
    private Timestamp updateDate;

    private String isDelete;

    @Transient
    private List<Image> images;

    @Transient
    private Video videos;

    @Transient
    private User user;
}
