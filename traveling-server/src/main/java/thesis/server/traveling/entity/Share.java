package thesis.server.traveling.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shares")
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shareId;

    @NotNull
    private Long userId;

    @NotNull
    private Long postId;

    private String text;

    @NotNull
    // 0: Public, 1: Follow, 2: Private
    private String status;

    @NotNull
    private Timestamp regDate;

    @Transient
    private Optional<User> user;
}
