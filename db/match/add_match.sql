INSERT INTO matches
(user_1, user_2)
VALUES
($1, $2);
SELECT DISTINCT u.id, u.phone_area, u.phone_num1, u.phone_num2, u.first, u.last, u.age, u.gender, u.rel_type, u.sexual_or, u.bio, u.url FROM matches m
JOIN users u ON u.id = CASE $1 WHEN m.user_1 THEN m.user_2 ELSE m.user_1 END
WHERE m.user_1 = $1 OR m.user_2 = $1;
