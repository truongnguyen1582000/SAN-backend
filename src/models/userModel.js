const mongoose = require('mongoose');
const validator = require('validator');

const userModel = mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Please provide student id'],
    unique: true,
    maxLength: [11, 'Student id must be have 11 character'],
    minLength: [11, 'Student id must be have 11 character'],
  },
  userName: {
    type: String,
    unique: true,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: [validator.isEmail, 'Email is invalid'],
    unique: true,
  },
  topic: [
    {
      topicName: {
        type: String,
      },
    },
  ],
  post: [
    {
      postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    },
  ],
  role: {
    type: String,
    default: 'student',
  },
  joinedEvent: [
    {
      eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    },
  ],
});

const UserModel = mongoose.model('User', userModel);
module.exports = UserModel;
