const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: 'Message text is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

module.exports = model('Message', MessageSchema);