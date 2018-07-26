import { Pool } from 'pg';
import config from './config';


const env = process.env.NODE_ENV;
let db;

if (env === 'test') {
  db = new Pool(config.test);
} else {
  db = new Pool(config.dev);
}
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
