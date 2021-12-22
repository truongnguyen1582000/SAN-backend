const mongoose = require('mongoose');

const reportedPost = Schema({
    postName: {
        type: String,
        required: true,
    },
    postId: {
        type: ObjectId,
        ref: 'Post',
    },
}, { timestamps: true });

const ReportedPost = mongoose.model('ReportedPost', reportedPost);
module.exports = ReportedPost;