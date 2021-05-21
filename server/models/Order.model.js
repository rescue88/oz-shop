const { Schema, model, Types } = require('mongoose');

const OrderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Types.ObjectId,
        ref: 'Product'
    }],
    price: {
        type: Number,
        required: "Загальна ціна замовлення - обов'язкова"
    },
    deliveryAddress: {
        type: String,
        required: "Адреса доставки - обов'язкова"
    },
    status: {
        type: String,
        enum: ['Оформлення', 'У дорозі', 'Очікування', 'Завершено'],
        default: 'Оформлення'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Order', OrderSchema);