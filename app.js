import express from 'express';
import bodyParser from 'body-parser';
import logger from 'volleyball';
import dotenv from 'dotenv';
import authRoute from './server/routes/authRoute';
import entryRoute from './server/routes/entryRoute';

dotenv.config();

const app = express();

const port = process.env.PORT || 7000;
// Log Requests
app.use(logger);

// App body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome To Diarium... Your emotions matter, Write it down!',
}));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/entries', entryRoute);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Diarium listening on port ${port}`);
});
export default app;
