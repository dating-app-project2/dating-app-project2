SELECT * FROM requests r 
JOIN users u ON u.id = r.receiver_id
WHERE r.sender_id = $1;