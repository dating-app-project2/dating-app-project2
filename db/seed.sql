DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pics_vids;

CREATE TABLE pics_vids(
    id SERIAL PRIMARY KEY,
    pic_vid_1 TEXT DEFAULT NULL,
    pic_vid_2 TEXT DEFAULT NULL,
    pic_vid_3 TEXT DEFAULT NULL,
    pic_vid_4 TEXT DEFAULT NULL,
    pic_vid_5 TEXT DEFAULT NULL,
    pic_vid_6 TEXT DEFAULT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    phone_area VARCHAR(3) DEFAULT NULL,
    phone_num1 VARCHAR(3) DEFAULT NULL,
    phone_num2 VARCHAR(4) DEFAULT NULL,
    first VARCHAR(200) DEFAULT NULL,
    last VARCHAR(300) DEFAULT NULL,
    password VARCHAR(200),
    age INT DEFAULT NULL,
    gender VARCHAR(200) DEFAULT NULL,
    rel_type VARCHAR(200) DEFAULT NULL,
    sexual_or VARCHAR(200) DEFAULT NULL,
    profile_content INT REFERENCES pics_vids(id)
);

CREATE TABLE requests(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id)
);

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    user_1 INT REFERENCES users(id),
    user_2 INT REFERENCES users(id)
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    message_content VARCHAR(1000) NOT NULL,
    user_id INT REFERENCES users(id),
    user2_id INT REFERENCES users(id),
    message_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO users
(email, password)
VALUES 
('jadenitripp@gmail.com', 'adminLogin123!'),
('joshuadreyleavitt@gmail.com', 'adminLogin123!'),
('danielboesch20@gmail.com', 'adminLogin123!');

INSERT INTO requests
(sender_id, receiver_id)
VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 2);

INSERT INTO matches
(user_1, user_2)
VALUES
(1, 2),
(2, 3),
(1, 3);

SELECT * FROM users;
SELECT * FROM requests;
SELECT * FROM matches;
SELECT * FROM messages;
SELECT * FROM pics_vids;