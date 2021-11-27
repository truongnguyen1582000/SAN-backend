const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const eventModel = Schema(
  {
    creator: {
      type: ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expiredDay: { type: Date },
    registedStudent: [{ type: ObjectId, ref: 'User' }],
    joinedStudent: [
      {
        student: { type: ObjectId, ref: 'User' },
        pictureUrl: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const EventModel = mongoose.model('Event', eventModel);
module.exports = EventModel;
