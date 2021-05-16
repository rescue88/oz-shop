const { Schema, model, Types } = require('mongoose');

const RatingSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Types.ObjectId,
        ref: 'Product'
    },
    mark: {
        type: Number,
        min: 1,
        max: 10,
    },
    created: {
        type: Date,
        default: Date.now
    },
});

RatingSchema.index({user: 1, product: 1}, {unique: true});

module.exports = model('Rating', RatingSchema);