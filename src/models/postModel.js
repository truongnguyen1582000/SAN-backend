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
    topic: { type: ObjectId, ref: 'Topic' },
    postTitle: {
      type: String,
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    upvote: [{ type: ObjectId, ref: 'User', default: [] }],
    downvote: [{ type: ObjectId, ref: 'User', default: [] }],
    postComment: [
      {
        commentBy: { type: ObjectId, ref: 'User' },
        comment: {
          type: String,
        },
        upvoteC: [{ type: ObjectId, ref: 'User', default: [] }],
        downvoteC: [{ type: ObjectId, ref: 'User', default: [] }],
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', postModel);
module.exports = PostModel;
