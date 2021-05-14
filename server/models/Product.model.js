const { Schema, model, Types } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: "Ім'я продукту є обов'язковим полем",
        unique: "Товар з таким ім'ям уже існує"
    },
    description: {
        type: String,
        required: "Додайте опис продукту"
    },
    image: {
        data: Buffer,
        contentType: String,
        default: ""
    },
    category: {
        type: Types.ObjectId,
        ref: "categories"
    },
    price: {
        type: Number,
        required: "Вкажіть ціну товару"
    },
    amount: {
        type: Number,
        min: [0, "Кількість продуктів - невід'ємне число"],
        max: [30, "Максимальна кількість продуктів одного типу на складі - 30шт."],
        default: 0
    },
    producer: {
        type: String,
        required: "Вкажіть виробника продукту"
    },
    size: {
        type: String,
        required: "Вкажіть габарити продукта"
    },
    created: {
        type: Date,
        default: Date.now
    },
    discounts: {
        type: [{
            type: Types.ObjectId,
            ref: "Discount"
        }],
    },
});

module.exports = model("Product", ProductSchema);