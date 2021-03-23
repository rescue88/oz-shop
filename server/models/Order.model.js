import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    price: {
        type: Number,
        required: 'Price is required'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default model('Order', OrderSchema);