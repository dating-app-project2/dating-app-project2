INSERT INTO messages
(userId, matchId, message_content, message_timestamp)
VALUES($1, $2, $3, CURRENT_TIMESTAMP)
RETURNING *;