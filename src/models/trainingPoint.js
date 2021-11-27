const mongoose = require('mongoose');
const { Schema } = mongoose;

const trainingPointModel = Schema({}, { timestamps: true });

const TrainingPointModel = mongoose.model('TrainingPoint', trainingPointModel);
module.exports = TrainingPointModel;
