import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
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
app.get('/', (request, response) => response.sendfile('./client/index.html'));

// connect static files
app.use(express.static(path.resolve(__dirname, './client/')));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users/entries', entryRoute);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Diarium listening on port ${port}`);
});
export default app;
