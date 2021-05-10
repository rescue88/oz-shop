const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: "Ім'я категорії є унікальним полем",
        required: "Ім'я категорії обов'язкове"
    },
    description: String,
});

module.exports = model('Category', CategorySchema);