import express from 'express';
import bodyParser from 'body-parser';
import logger from 'volleyball';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 7000;
// Log Requests
app.use(logger);

// App body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome To Diarium... Your emotions matter, Write it down!',
}));
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Diarium listening on port ${port}`);
});
export default app;
