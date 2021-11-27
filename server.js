require('dotenv').config();
const express = require('express');
const cors = require('cors');
var router = express.Router();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONNECT TO DB
const connectToDb = require('./src/config/dbConnector');
connectToDb();

// ROUTE
const authRoute = require('./src/routes/authRoute');
const postRoute = require('./src/routes/postRoute');
const eventRoute = require('./src/routes/eventRoute');
const trainingPointRoute = require('./src/routes/trainingPointRoute');

app.use('/api', router);
router.use('/auth', authRoute);
router.use('/post', postRoute);
router.use('/event', eventRoute);
router.use('/training-point', trainingPointRoute);

// handle undefined url
app.all('*', (req, res, next) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

module.exports = app;
