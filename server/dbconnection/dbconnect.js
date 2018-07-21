import { Pool } from 'pg';
import fs from 'fs';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const db = new Pool(config[env]);
const tables = fs.readFileSync(`${__dirname}/table.sql`).toString();

// connect pg
db.connect().then(() => {
  // eslint-disable-next-line
  console.log('connection successful');
}).catch((error) => {
  // eslint-disable-next-line
  console.log(error.message);
});


// create tables
db.query(tables, (err, res) => {
  // eslint-disable-next-line
  console.log(err, res)
});

export default db;
