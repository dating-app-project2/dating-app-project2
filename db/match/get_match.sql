SELECT * FROM matches
WHERE id = $1;

--this will get an individual match (used when the user clicks on an individual chat and also in the rendering of all the individual matches.