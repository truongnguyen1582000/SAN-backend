const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const eventModel = Schema({
    creator: {
        type: ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['opened', 'closed'],
    },
    expiredDay: { type: Date, default: Date.now() },
    registedStudent: [{ type: ObjectId, ref: 'User' }],
    joinedStudent: [{
        student: { type: ObjectId, ref: 'User' },
        checkAttend: false,
        pictureUrl: {
            data: Buffer,
            contentType: String,
        },
    }, ],
}, { timestamps: true });

const EventModel = mongoose.model('Event', eventModel);
module.exports = EventModel;