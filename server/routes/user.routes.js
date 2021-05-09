const { Router } = require('express');
const User = require('./../models/User.model');
const formidable = require('formidable');
const fs = require('fs');

const { deleteUserPrivateInfo, parseDateUkr, userById } = require('./helpers/helpers');
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
                message: 'Не вдалось отримати юзерів'
            });
        }
    }
);

// find user by id
router.get(
    '/:id',
    userById,
    async (req, res) => {
        try {
            let user = req.profile;
            // preparing user data for sending
            user = deleteUserPrivateInfo(user._doc);
            user.created = parseDateUkr(user.created, 'PP');

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
                    message: 'Не вдалося оновити профіль',
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
                message: 'Не вдалося видалити юзера',
                success: false
            });
        }
    }
);

module.exports = router;