const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const reportedPost = Schema({
  postReported: {
    type: ObjectId,
    ref: 'Post',
  },
});

const ReportedPost = mongoose.model('ReportedPost', reportedPost);
module.exports = ReportedPost;
