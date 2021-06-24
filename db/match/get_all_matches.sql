SELECT * FROM matches m
JOIN users u on u.id = m.user_2
WHERE m.user_1 = $1 OR m.user_2 = $1;