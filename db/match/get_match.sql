SELECT * FROM matches m
JOIN users u on u.id = m.user_2
WHERE m.id = $1;
