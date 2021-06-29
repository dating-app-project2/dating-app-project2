SELECT DISTINCT m.id, m.message_content, m.message_timestamp, m.userId, u.first from messages m
JOIN users u ON u.id = m.userId 
WHERE m.matchId = $1
ORDER BY m.message_timestamp;