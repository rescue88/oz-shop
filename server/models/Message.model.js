const { Schema, model, Types } = require('mongoose');

const MessageSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Types.ObjectId,
        ref: 'Product'
    },
    text: {
        type: String,
        required: "Текст повідомлення - обов'язкове поле"
    },
    positive: {
        type: Boolean,
        required: "Тип відгуку - обов'язкове поле"
    },
    created: {
        type: Date,
        default: Date.now
    },
});

MessageSchema.index({user: 1, product: 1}, {unique: true});

module.exports = model('Message', MessageSchema);