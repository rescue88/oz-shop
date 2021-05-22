const { Router } = require('express');
const User = require('./../models/User.model');
const formidable = require('formidable');
const fs = require('fs');

const { parseDateUkr, userById, retrieveFavorites } = require('./helpers/helpers');
const router = Router();

// get a list of all users
router.get(
    '/',
    async (req, res) => {
        try {
            const users = await User.find({}, {login: 1, email: 1, name: 1, permissions: 1, phone: 1});
            // at least 1 user in a list - admin; if(!users) isnt required
            return res.status(200).json({
                message: "Список юзерів успішно завантажено",
                success: true,
                users
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалось отримати юзерів; ${e.message}`,
                success: false
            });
        }
    }
);

// find user by id
router.get(
    '/:id',
    userById,
    retrieveFavorites,
    async (req, res) => {
        try {
            let user = req.profile;

            // prepare data for sending
            user._doc.created = parseDateUkr(user._doc.created, 'PP');
            user.favorites = req.favorites;

            return res.status(200).json({
                success: true,
                user
            });
        } catch(e) {
            return res.status(400).json({
                message: `Щось не так з роутом /user/:id ${e.message}`
            });
        }
    }
);

// update profile
router.put(
    '/update/:id',
    userById,
    async (req, res) => {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if(err) {
                return res.status(400).json({
                    message: "Не вдалося додати фото",
                    success: false
                });
            }

            let user = req.profile;

            if(files.avatar) {
                user.avatar.data = fs.readFileSync(files.avatar.path);
                user.avatar.contentType = files.avatar.type;
            } else {
                delete fields.avatar;
            }

            user = Object.assign(user, fields);

            try {
                await user.save();

                return res.status(200).json({
                    message: 'Дані профіля успішно оновлено',
                    success: true
                });
            } catch(e) {
                return res.status(400).json({
                    message: `Не вдалося оновити профіль; ${e.message}`,
                    success: false
                });
            }
        });
    }
);

// delete profile
router.delete(
    '/delete/:id',
    userById,
    async (req, res) => {
        try {
            const user = req.profile;

            await user.remove();

            return res.status(200).json({
                message: 'Юзера успішно видалено',
                success: true
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося видалити юзера; ${e.message}`,
                success: false
            });
        }
    }
);

// save product into your favorites tab
router.post(
    '/favorites/add/:id',
    userById,
    async (req, res) => {
        try {
            let user = req.profile;
            const {productId} = req.body;
    
            if(user.favorites.includes(productId)) {
                return res.status(400).json({
                    message: "Товар вже додано до обраного",
                    success: false
                });
            }
    
            user.favorites.push(productId);
    
            await user.save();
    
            return res.status(200).json({
                message: "Товар успішно додано до заміток",
                success: true,
                productId
            });
        } catch(e) {
            res.status(400).json({
                message: `Не вдалося додати до заміток; ${e.message}`,
                success: false
            });
        }
    }
);

// delete from favorites tab
router.delete(
    '/favorites/delete',
    userById,
    async (req, res) => {
        try {
            let user = req.profile;
            const productId = req.query.productId;

            if(!user.favorites.includes(productId)) {
                return res.status(400).json({
                    message: "Такого товару в обраних не існує",
                    success: false
                });
            }

            user.favorites = user.favorites.filter(item => item != productId);
            await user.save();

            return res.status(200).json({
                message: "Товар успішно видалено із збереженого",
                success: true,
                productId
            });
        } catch(e) {
            res.status(400).json({
                message: `Не вдалося видалити товар із заміток; ${e.message}`,
                success: false
            });
        }
    }
);

// remove all favorites in one click
router.delete(
    '/favorites/delete/all',
    userById,
    async (req, res) => {
        try {
            let user = req.profile;
            // get rid of favorites
            user.favorites = [];

            await user.save();

            return res.status(200).json({
                message: 'Усі замітки успішно видалено',
                success: true
            });
        } catch(e) {
            return res.status(200).json({
                message: `Не вдалося видалити замітки; ${e.message}`,
                success: false
            });
        }
    }
)

module.exports = router;