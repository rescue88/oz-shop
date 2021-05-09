const { Router } = require('express');
const User = require('./../models/User.model');
const formidable = require('formidable');
const fs = require('fs');

const { deleteUserPrivateInfo, parseDateUkr, userById } = require('./helpers/helpers');
const router = Router();

// fint user by id
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
                    message: e.message,
                    success: false
                });
            }
        });
    }
)

module.exports = router;