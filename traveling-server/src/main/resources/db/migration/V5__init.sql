CREATE TABLE BLOCKS (
    BLOCK_ID SERIAL PRIMARY KEY,
    SOURCE_ID INT NOT NULL,
    TARGET_ID INT NOT NULL,
    REG_DATE TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (SOURCE_ID) REFERENCES USERS(USER_ID),
    FOREIGN KEY (TARGET_ID) REFERENCES USERS(USER_ID)
);

CREATE TABLE REPORTS (
    REPORT_ID SERIAL PRIMARY KEY,
    SOURCE_ID INT NOT NULL,
    TARGET_ID INT NOT NULL,
    POST_ID INT,
    TYPE CHARACTER VARYING(200) NOT NULL,
    TEXT CHARACTER VARYING(2000),
    REG_DATE TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (SOURCE_ID) REFERENCES USERS(USER_ID),
    FOREIGN KEY (TARGET_ID) REFERENCES USERS(USER_ID),
    FOREIGN KEY (POST_ID) REFERENCES POSTS(POST_ID)
);

CREATE TABLE NOTIFICATIONS (
    NOTIFICATION_ID SERIAL PRIMARY KEY,
    SOURCE_ID INT NOT NULL,
    TARGET_ID INT,
    TYPE CHAR(1) NOT NULL,
    REG_DATE TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (SOURCE_ID) REFERENCES USERS(USER_ID),
    FOREIGN KEY (TARGET_ID) REFERENCES USERS(USER_ID)
);