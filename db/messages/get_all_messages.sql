SELECT * FROM messages
WHERE match_id = $1
ORDER BY ASC;