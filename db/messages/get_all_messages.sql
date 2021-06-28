SELECT DISTINCT m.id, m.message_content, m.message_timestamp from messages m
JOIN users u ON u.id = m.userId 
WHERE m.userId = $1
ORDER BY m.message_timestamp;