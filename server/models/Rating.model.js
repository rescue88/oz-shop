const { Schema, model } = require('mongoose');

const RatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    mark: {
        type: number,
        min: 1,
        max: 10,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

module.exports = model('Rating', RatingSchema);