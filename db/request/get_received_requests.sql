SELECT * FROM requests r
JOIN users u ON u.id = r.receiver_id
WHERE r.receiver_id  = $1;