package thesis.server.traveling.constant;

public class SystemConst {

    //User's status
    public static final String USER_STATUS_NORMAL = "0";
    public static final String USER_STATUS_NON_VERIFY = "1";
    public static final String USER_STATUS_NON_SETUP = "2";
    public static final String USER_STATUS_LOCKED = "3";
    public static final String USER_ADMIN = "4";


    //Post's status
    public static final String POST_STATUS_PUBLIC = "0";
    public static final String POST_STATUS_FOLLOW = "1";
    public static final String POST_STATUS_PRIVATE = "2";

    //Upload directory
    public static String UPLOAD_DIRECTORY = "D:/thesis/traveling-server/src/main/resources/static/";
    public static String UPLOAD_LOCATION = "http://localhost:8080/content/";

    // FLg
    public static final String FLG_OFF = "0";
    public static final String FLG_ON = "1";

    // Notification's type
    public static final String NOTIFICATION_CREATE_POST = "0";
    public static final String NOTIFICATION_SEND_LIKE_POST = "1";
    public static final String NOTIFICATION_SEND_LIKE_COMMENT = "2";
    public static final String NOTIFICATION_SEND_COMMENT = "3";
    public static final String NOTIFICATION_SEND_SHARE = "4";
    public static final String NOTIFICATION_SEND_FOLLOW = "5";
    public static final String NOTIFICATION_SEND_MESSAGE = "6";
}

