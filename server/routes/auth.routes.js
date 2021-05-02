const { Router } = require('express');
const User = require('./../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = Router();

// try to auth
router.post(
    '/login',
    async (req, res) => {
        try {
            const { login, password } = req.body;

            let user = await User.findOne({ login });

            if(!user) {
                return res.status(400).json({
                    message: "Користувача з даним логіном не існує",
                    success: false
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({
                    message: "Пароль не вірний",
                    success: false
                });
            }

            // generating token
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            // preparing user data for sending
            user = user._doc;
            delete user.__v;
            delete user._id;
            delete user.password;

            return res.status(200).json({
                success: true,
                token, 
                userId: user._id,
                user
            });
        } catch(e) {
            return res.json({
                message: `Щось не так з роутом /login ${e.message}`,
                success: false
            });
        }
    }
);
// create user
router.post(
    '/register',
    async (req, res) => {
        try {
            const { name, email, login, phone, password } = req.body;

            const origEmail = await User.find({ email });
            if(origEmail.length) {
                return res.status(400).json({
                    message: "Дана пошта вже використовується",
                    success: false
                });
            }
            const origLogin = await User.find({ login });
            if(origLogin.length) {
                return res.status(400).json({
                    message: "Даний логін уже використовується",
                    success: false
                });
            }
            const origPhone = await User.find({ phone });
            if(origPhone.length) {
                return res.status(400).json({
                    message: "Даний мобільний уже використовується",
                    success: false
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                name,
                email,
                login,
                phone,
                password: hashedPassword,
            });

            await user.save();

            return res.status(200).json({
                message: 'Юзера успішно створено',
                success: true,
            });
        } catch(e) {
            return res.status(400).json({
                message: `Щось не так з роутом /register ${e.message}`,
                success: false
            });
        }
    }
);

module.exports = router;