const { Router } = require('express');
const User = require('./../models/User.model');

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
        try {
            const user = req.profile;
            const newFields = req.body;
            console.log(newFields);
            console.log(typeof newFields.photo);
    
            return res.status(200).json({
                message: 'Дані успішно оновлено',
                success: true
            });
        } catch(e) {
            res.status(400).json({
                message: `Щось не так з роутом /user/update/:id ${e.message}`,
                success: false,
            })
        }
    }
)

module.exports = router;