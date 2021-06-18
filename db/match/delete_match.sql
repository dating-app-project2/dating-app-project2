DELETE FROM matches
WHERE id = $1;
--when users unmatch this will be called