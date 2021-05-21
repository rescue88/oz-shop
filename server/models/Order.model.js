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
    name: {
        type: String,
        required: "Введіть ім'я замовника"
    },
    phone: {
        type: String,
        required: 'Введіть мобільний телефон'
    },
    email: {
        type: String,
        required: 'Заповність пошту'
    },
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