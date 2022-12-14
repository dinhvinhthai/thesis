package thesis.server.traveling.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @NotNull
    private Long sourceId;

    private Long postId;

    @NotNull
    private Long targetId;

    @NotNull
    private String type;

    private String status;

    private String text;

    @NotNull
    private Timestamp regDate;

    @Transient
    private User sourceUser;

    @Transient
    private User targetUser;

    @Transient
    private Post post;
}
