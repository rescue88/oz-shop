const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    avatar: {
        data: Buffer,
        contentType: String,
    },
    name: {
        type: String,
        required: "Ім'я обо'язкове поле"
    },
    email: {
        type: String,
        unique: 'Дана пошта уже використовується в системі',
        match: [/.+\@.+\..+/, 'Будь-ласка, заповніть пошту правильно'],
        required: "Пошта обо'язкове поле"
    },
    login: {
        type: String,
        unique: 'Даний логін уже використовується в системі',
        match: [/^[a-zA-Z0-9_]*$/, 'Введіть логін у правильному форматі'],
        required: "Логін обо'язкове поле"
    },
    phone: {
        type: String,
        unique: 'Даний мобільний уже використовується в системі',
        required: "Телефон обо'язкове поле"
    },
    permissions: {
        type: String,
        enum: ['admin', 'user', 'moder'],
        default: 'user'
    },
    password: {
        type: String,
        required: "Пароль обо'язкове поле"
    },
    created: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: [{
            type: Types.ObjectId,
            ref: 'Product'
        }],
        default: []
    },
});

module.exports = model('User', UserSchema);