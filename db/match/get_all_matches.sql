SELECT * FROM matches
WHERE user_1 = $1
ORDER BY ASC;
--get all the matches for the user (user_1 will represent the current user that is logged and in and will display all their matches)