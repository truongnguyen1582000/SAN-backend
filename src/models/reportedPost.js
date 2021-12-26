const mongoose = require('mongoose');

const reportedPost = Schema(
  {
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true }
);

const ReportedPost = mongoose.model('ReportedPost', reportedPost);
module.exports = ReportedPost;
