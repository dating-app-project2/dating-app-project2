DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS users;

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
    sexual_or VARCHAR(200) DEFAULT NULL
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
    match_id INT REFERENCES matches(id),
    message_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;
SELECT * FROM requests;
SELECT * FROM matches;
SELECT * FROM messages;