package thesis.server.traveling.payload;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class RegisterRequest {
    @NotNull @Email @Length(min = 5, max = 100)
    private String email;

    @NotNull @Length(min = 5, max = 100)
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
