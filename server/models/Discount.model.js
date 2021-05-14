const { Schema, model } = require('mongoose');

const DiscountSchema = new Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String,
        required: "Назва знижки обов'язкова",
        uniqure: true
    },
    description: {
        type: String,
        required: "Опис знижки обов'язковий"
    },
    created: {
        type: Date,
        default: Date.now
    },
    percent: {
        type: Number,
        required: "Відсоток знижки обов'язковий"
    }
});

module.exports = model('Discount', DiscountSchema);