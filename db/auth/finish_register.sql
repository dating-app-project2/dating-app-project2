UPDATE users
SET phone_area = $2,
phone_num1 = $3,
phone_num2 = $4,
first = $5,
last = $6,
age = $7,
gender= $8,
rel_type = $9,
sexual_or = $10,
bio = $11,
url = $12
WHERE id = $1;

SELECT * FROM users WHERE id  = $1;
