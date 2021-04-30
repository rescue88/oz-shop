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

            const user = await User.findOne({ login });

            if(!user) {
                res.status(400).json({
                    message: "Користувача з даним логіном не існує"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({
                    message: "Пароль не вірний"
                });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                token, userId: user.id
            });
        } catch(e) {
            return res.status(400).json({
                message: e.message
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
                success: true,
                message: 'Юзера успішно створено'
            });
        } catch(e) {
            return res.status(400).json({
                message: e.message
            });
        }
    }
);

module.exports = router;