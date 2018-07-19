import { Pool } from 'pg';
import config from '../config/config';

const db = new Pool(config.dev);
// console.log(db);

// connect pg
db.connect().then(() => {
  // eslint-disable-next-line
  console.log('connection successful');
}).catch((error) => {
  // eslint-disable-next-line
  console.log(error.message);
});
// create tables
// db.query('').then((response) => {
//   // eslint-disable-next-line
//   console.log(response);
// }).catch((error) => {
//   // eslint-disable-next-line
//   console.log(error.message);
// });
export default db;
