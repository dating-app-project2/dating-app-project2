INSERT INTO users
(email, password )
VALUES
(${email}, ${hash})
RETURNING *;
