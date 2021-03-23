import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    name: {
        type: String,
        required: 'Category name is required'
    },
    description: String,
    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
        default: []
    }
});

export default model('Category', CategorySchema);