const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const userModel = Schema(
  {
    studentId: {
      type: String,
      unique: true,
      maxLength: [11, 'Student id must be have 11 character'],
      minLength: [11, 'Student id must be have 11 character'],
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      validate: [validator.isEmail, 'Email is invalid'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    trainingPoint: {
      type: Number,
      default: 0,
    },
    topics: [{ type: ObjectId, ref: 'Topic' }],
    role: {
      type: String,
      default: 'student',
      enum: ['student', 'admin'],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userModel);
module.exports = UserModel;
