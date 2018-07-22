import { Pool } from 'pg';
import config from '../../config/config';

const db = new Pool(config.dev);
// create user  table
db.query(
  `CREATE TABLE users
  (id SERIAL PRIMARY KEY, 
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW());`,
)
  .then((response) => {
  // eslint-disable-next-line
  console.log(response);
  }).catch((error) => {
  // eslint-disable-next-line
  console.log(error.message);
  });
