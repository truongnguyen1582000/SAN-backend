const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const trainingPointModel = Schema(
  {
    student: { type: ObjectId, ref: 'User' },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const TrainingPointModel = mongoose.model('TrainingPoint', trainingPointModel);
module.exports = TrainingPointModel;
