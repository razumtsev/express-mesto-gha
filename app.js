const express = require('express');
const mongoose = require('mongoose');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const appRouter = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to mestodb');
});

const app = express();
const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '65391ffeba5a6a65ced1bc72',
  };
  next();
});

app.use(appRouter);
app.use(limiter);
app.use(helmet());

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
