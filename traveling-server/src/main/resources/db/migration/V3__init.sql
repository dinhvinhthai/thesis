CREATE TABLE LIKES (
    LIKE_ID SERIAL PRIMARY KEY,
    USER_ID INT NOT NULL,
    POST_ID INT,
    COMMENT_ID INT,
    REG_DATE TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
    FOREIGN KEY (POST_ID) REFERENCES POSTS(POST_ID)
);

CREATE TABLE SHARES (
    SHARE_ID SERIAL PRIMARY KEY,
    USER_ID INT NOT NULL,
    POST_ID INT NOT NULL,
    TEXT CHARACTER VARYING(2000),
    STATUS CHAR(1) NOT NULL,
    REG_DATE TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
    FOREIGN KEY (POST_ID) REFERENCES POSTS(POST_ID)
);