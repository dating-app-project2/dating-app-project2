-- SELECT * FROM matches
-- WHERE id = $1;

SELECT * FROM matches
WHERE user_1 = $1 OR user_2 = $1;

--this will get an individual match (used when the user clicks on an individual chat and also in the rendering of all the individual matches.