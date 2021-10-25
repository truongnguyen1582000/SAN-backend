const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const reportedPost = Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const ReportedPost = mongoose.model('ReportedPost', reportedPost);
module.exports = ReportedPost;
