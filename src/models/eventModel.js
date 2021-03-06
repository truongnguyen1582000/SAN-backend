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
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
    expiredDay: { type: Date },
    registedStudent: [{ type: ObjectId, ref: 'User', default: [] }],
    attendedStudent: [
      {
        student: { type: ObjectId, ref: 'User', default: [] },
        checkAttend: {
          type: Boolean,
          default: false,
        },
        // pictureUrl: {
        //     data: Buffer,
        //     contentType: String,
        // },
      },
    ],
  },
  { timestamps: true }
);

const EventModel = mongoose.model('Event', eventModel);
module.exports = EventModel;
