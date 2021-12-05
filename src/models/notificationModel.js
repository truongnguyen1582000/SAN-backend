const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      maxlength: 2000,
      trim: true,
    },
    readed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
