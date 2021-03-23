import { Schema, model } from 'mongoose';

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

export default model('Message', MessageSchema);