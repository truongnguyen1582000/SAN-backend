const mongoose = require('mongoose');

const reportedPost = Schema({
  postList: {
    type: ObjectId,
    ref: 'Post',
  },
});

const ReportedPost = mongoose.model('ReportedPost', reportedPost);
module.exports = ReportedPost;
