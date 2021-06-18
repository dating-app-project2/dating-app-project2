DELETE * FROM requests 
WHERE sender_id = $1 AND receiver_id = $2;