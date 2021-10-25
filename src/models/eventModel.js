const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const eventModel = Schema({
  registedStudent: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  joinedStudent: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      pictureUrl: {
        type: String,
      },
    },
  ],
});

const EventModel = mongoose.model('Event', eventModel);
module.exports = EventModel;
