-- INSERT INTO messages
-- (user_id, match_id, first, message_content, message_timestamp)
-- VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)
-- RETURNING *;
INSERT INTO messages
(user1, user2, message_content, CURRENT_TIMESTAMP)
VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)
RETURNING *;
