package thesis.server.traveling.payload;

public class AuthResponse {
    private Long userId;
    private String email;
    private String name;
    private String status;

    private String avatarUrl;
    private String accessToken;

    public AuthResponse() { }

    public AuthResponse(Long userId, String email, String name, String status, String avatarUrl, String accessToken) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.status = status;
        this.avatarUrl = avatarUrl;
        this.accessToken = accessToken;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}