package thesis.server.traveling.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;

    @NotNull
    // 0: Non-Verify, 1: Non-Setup, 2: Lock
    private String status;

    private String name;

    // 0: Male, 1: Female, 2: Other
    private String gender;

    private Date birthday;

    private String job;

    private String country;

    private String phone;

    private String address;

    private String introduce;

    private String story;

    @NotNull
    private Timestamp regDate;

    @NotNull
    private Timestamp updateDate;

    private String avatarSrc;

    private String backgroundSrc;

    private String isOnline;

    @Transient
    private List<Long> statistics;

    @Transient
    private Long postCount;

    @Transient
    private Long followCount;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
