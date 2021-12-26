require('dotenv').config();
const express = require('express');
const cors = require('cors');
var router = express.Router();
const morgan = require('morgan');

const app = express();
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CONNECT TO DB
const connectToDb = require('./src/config/dbConnector');
connectToDb();

// ROUTE
const authRoute = require('./src/routes/authRoute');
const postRoute = require('./src/routes/postRoute');
const eventRoute = require('./src/routes/eventRoute');
const trainingPointRoute = require('./src/routes/trainingPointRoute');
const topicRoute = require('./src/routes/topicRoute');

app.use('/api', router);
router.use('/auth', authRoute);
router.use('/post', postRoute);
router.use('/event', eventRoute);
router.use('/training-point', trainingPointRoute);
router.use('/topic', topicRoute);

// handle undefined url
app.all('*', (req, res, next) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

module.exports = app;
