SELECT DISTINCT m.id, m.message_content, m.timestamp from messages m
JOIN users u ON u.id = m.user 
WHERE m.userId = $1
ORDER BY m.message_timestamp;