DELETE FROM requests 
WHERE sender_id = $1;

SELECT * FROM requests 
WHERE receiver_id = $2;