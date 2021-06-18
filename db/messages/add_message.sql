INSERT INTO messages
(user_id, match_id, first, message_content, message_timestamp)
VALUES($1, $2, $3, $4)
RETURNING *;
