CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(250) NOT NULL,
  "createdAt" TIMESTAMP Default Now()
);
CREATE TABLE entries
(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(250) NOT NULL,
  entry TEXT NOT NULL,
  "createdAt" TIMESTAMP Default Now()
);
