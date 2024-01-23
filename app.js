require('dotenv').config();
// console.log(process.env);

const express = require('express');
const mongoose = require('mongoose');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const appRouter = require('./routes');
const rateLimitSettings = require('./utils/rateLimitSettings');
const errorHandler = require('./middlewares/errorHandler');
const {
  port,
  databaseName,
} = require('./config');

mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
  useNewUrlParser: true,
}).then(() => {
  // eslint-disable-next-line
  console.log(`Connected to ${databaseName}`);
});

const app = express();

const limiter = rateLimit(rateLimitSettings);

app.use(express.json());

app.use(limiter);
app.use(helmet());

app.use(appRouter);

app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`app is listening on port ${port}`);
});
