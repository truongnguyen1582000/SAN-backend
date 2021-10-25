const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const postModel = Schema({
  postType: {
    type: String,
    enum: ['blog', 'question'],
  },
  postTitle: {
    type: String,
    required: true,
  },
  upvote: {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  downvote: {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  postComment: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      comment: {
        type: String,
      },
      upvote: {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
      },
      downvote: {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    },
  ],
});

const PostModel = mongoose.model('Event', postModel);
module.exports = PostModel;
