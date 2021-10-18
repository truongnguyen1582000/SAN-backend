require('dotenv').config();
const express = require('express');
const cors = require('cors');
var router = express.Router();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

// CONNECT TO DB
const connectToDb = require('./src/config/dbConnector');
connectToDb();

// ROUTE
const authRoute = require('./src/routes/authRoute');
const postRoute = require('./src/routes/postRoute');
const reportedPostRoute = require('./src/routes/reportedPostRoute');
const trainingPointRoute = require('./src/routes/trainingPointRoute');

app.use('/api', router);
router.use('/auth', authRoute);
router.use('/post', postRoute);
router.use('/event', reportedPostRoute);
router.use('/training-point', trainingPointRoute);

// handle undefined url
app.all('*', (req, res, next) => {
  res.status(404).json({
    msg: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

module.exports = app;
