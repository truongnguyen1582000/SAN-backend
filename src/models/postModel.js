const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postModel = mongoose.Schema(
  {
    author: { type: ObjectId, ref: 'User' },
    postType: {
      type: String,
      enum: ['blog', 'question'],
      default: 'question',
    },
    postTitle: {
      type: String,
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    upvote: [{ type: ObjectId, ref: 'User' }],
    downvote: [{ type: ObjectId, ref: 'User' }],
    postComment: [
      {
        commentBy: { type: ObjectId, ref: 'User' },
        comment: {
          type: String,
        },
        upvote: [{ type: ObjectId, ref: 'User' }],
        downvote: [{ type: ObjectId, ref: 'User' }],
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', postModel);
module.exports = PostModel;
