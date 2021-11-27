const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('Connect to db successfully');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDB;
