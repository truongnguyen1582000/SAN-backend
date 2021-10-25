const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const eventModel = Schema({});

const EventModel = mongoose.model('Event', eventModel);
module.exports = EventModel;
