const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicModel = Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const TopicModel = mongoose.model('Topic', topicModel);
module.exports = TopicModel;
