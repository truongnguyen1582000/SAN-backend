const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const eventModel = Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide user name"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 6 characters"],
    maxLength: [16, "Password must be leaster than 18 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: [validator.isEmail, "Email is invalid"],
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
      postId: { type: Schema.Types.ObjectId, ref: "Post" },
    },
  ],
  role: {
    type: String,
    default: "student",
  },
  joinedEvent: [
    {
      eventId: { type: Schema.Types.ObjectId, ref: "Event" },
    },
  ],
});

const User = mongoose.model("User", eventModel);
module.exports = User;
