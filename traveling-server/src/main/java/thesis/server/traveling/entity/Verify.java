package thesis.server.traveling.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "verifies")
public class Verify {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long verifyId;

    @NotNull
    private Long userId;

    @NotNull
    private String token;

    @NotNull
    // 0: Non-Verify, 1: Non-Setup, 2: Lock
    private Timestamp regDate;
}
