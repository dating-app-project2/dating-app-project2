SELECT * FROM matches
WHERE user_1 OR user_2 = $1
ORDER BY ASC;
