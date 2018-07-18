import { Pool } from 'pg';
import config from '../config/config';

const db = new Pool(config.dev);

// connect pg
db.connect().then(() => {
  // eslint-disable-next-line
  console.log('connection successful');
}).catch((error) => {
  // eslint-disable-next-line
  console.log(error.message);
});
// create tables
db.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW(), updated_at TIMESTAMP NOT NULL DEFAULT NOW()); CREATE TABLE IF NOT EXISTS entries (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, image_url VARCHAR(1000), entry_note TEXT NOT NULL, user_id integer REFERENCES users (id), created_at TIMESTAMP NOT NULL DEFAULT NOW(), updated_at TIMESTAMP NOT NULL DEFAULT NOW());').then((response) => {
  // eslint-disable-next-line
  console.log(response);
}).catch((error) => {
  // eslint-disable-next-line
  console.log(error.message);
});
export default db;
