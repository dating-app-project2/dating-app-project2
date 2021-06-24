SELECT * FROM requests r
JOIN users u ON u.id = r.sender_id
WHERE r.receiver_id  = $1;