const express = require('express');
const mongoose = require('mongoose');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const appRouter = require('./routes');
const rateLimitSettings = require('./utils/rateLimitSettings');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to mestodb');
});

const app = express();
const { PORT = 3000 } = process.env;

const limiter = rateLimit(rateLimitSettings);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '65391ffeba5a6a65ced1bc72',
  };
  next();
});

app.use(limiter);
app.use(helmet());

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
