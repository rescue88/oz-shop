import { Schema, model } from 'mongoose';

const DiscountSchema = new Schema({
    name: {
        type: String,
        required: 'Discount name is required'
    },
    description: {
        type: String,
        required: 'Discount description is required'
    },
    image: {
        data: Buffer,
        contentType: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    percent: {
        type: Number,
        min: [1, '< 1% discount doesnt matter'],
        max: [50, 'the highest discount possibility is 50%']
    }
});

export default model('Discount', DiscountSchema);