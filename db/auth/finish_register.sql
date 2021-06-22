UPDATE users
SET first = $2,
last = $3,
age = $4,
gender = $5,
rel_type = $6,
sexual_or = $7
WHERE id = $1
RETURNING *;