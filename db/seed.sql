DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS pictures;

-- CREATE TABLE pictures(
--    id SERIAL PRIMARY KEY,
--    user_id INT REFERENCES users(id),
--    url TEXT DEFAULT NULL
-- );


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
    bio VARCHAR(450) DEFAULT NULL,
    url TEXT DEFAULT NULL
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
    userId INT REFERENCES users(id),
    matchId INT REFERENCES matches(id),
    message_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO users
(email, phone_area, phone_num1, phone_num2, first, last, password, age, gender, rel_type, sexual_or, bio, url)
VALUES 
('jadenitripp@gmail.com', '801', '362', '8766', 'Jaden', 'Tripp', 'adminLogin123!', '22', 'Male', 'Hookup', 'Bisexual','Let''s get it started it here', 'https://i.ibb.co/WfDB0Wh/jadenpark.jpg'),
('joshuadreyleavitt@gmail.com', '385', '685', '8434', 'Joshua', 'Leavitt', 'adminLogin123!', '21', 'Male', 'Hookup', 'Straight', 'Swipe and lets do something', 'https://i.ibb.co/hsWrhp8/Josh.jpg'),
('danielboesch20@gmail.com', '440', '749', '4361', 'Daniel', 'Boesch', 'adminLogin123!', '25', 'Male', 'Taken', 'Straight', 'Oh I have no idea', 'https://media-exp1.licdn.com/dms/image/C4E35AQEbtHaO9_5oKw/profile-framedphoto-shrink_800_800/0/1620421175608?e=1625068800&v=beta&t=R0lOMHeiZh3IemoL-ky_TBjQDnI3Yv6Wa2xCUGSTF8w');

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

INSERT INTO messages 
(userId, matchId, message_content)
values
(1, 1, 'SUP DUDE'),
(2, 1, 'NOT MUCH DUDE'),
(2, 1, 'HAHA'),
(1, 1, 'NOT SUP SOMETHING BRO'),
(2, 2, 'NOT SUP');

SELECT * FROM users;
SELECT * FROM requests;
SELECT * FROM matches;
SELECT * FROM messages;
-- SELECT * FROM pictures;