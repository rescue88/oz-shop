const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: 'Product name is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    images: {
        data: [Buffer],
        contentType: String
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        required: 'Product price is required'
    },
    amount: {
        type: Number,
        min: [0, 'Minimal amount of products is 0'],
        max: [30, 'Maximum amount of products is 30'],
        default: 0
    },
    discounts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Discount'
        }],
        default: []
    },
    comments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }],
        default: []
    },
    rating: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        }],
        default: []
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

module.exports = model('Product', ProductSchema);