import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema({
    message: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    text: {
        type: String,
        required: 'Notification text is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    isChecked: {
        type: Boolean,
        default: false
    }
});

export default model('Notification', NotificationSchema);