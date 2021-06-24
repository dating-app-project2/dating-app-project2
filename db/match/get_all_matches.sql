SELECT * FROM matches m 
JOIN users u ON u.id = m.user_2 
WHERE m.user_1 = $1;
-- get other users for user_1 column
