SELECT * FROM matches m 
JOIN users u ON u.id = m.user_1
WHERE m.user_2 = $1;
-- get other users for user_2 column