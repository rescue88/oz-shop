const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: "Ім'я категорії є унікальним полем",
        required: "Ім'я категорії обов'язкове"
    },
    label: {
        type: String,
        required: "Підпис категорії обов'язковий"
    },
    description: String,
});

module.exports = model('Category', CategorySchema);