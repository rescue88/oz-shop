const { Router } = require('express');

const Message = require('./../models/Message.model');
const { parseDateUkr } = require('./helpers/helpers');

const router = Router();

// get all comments
router.get(
    '/',
    async (req, res) => {
        try {
            let comments = await Message.find({}, {__v: 0});

            if(!comments.length) {
                return res.status(200).json({
                    message: 'Жодного коментаря ще не додано',
                    success: true
                });
            }

            // get ua-parsed date
            comments = comments.map(item => {
                item._doc.created = parseDateUkr(item._doc.created, 'PP');
                return item;
            });

            return res.status(200).json({
                message: 'Коментарі успішно завантажено',
                success: true,
                comments
            });
        } catch(e) { 
            return res.status(400).json({
                message: `Не вдалося отримати коментарі; ${e.message}`,
                success: false
            })
        }
    }
);

// get user's own comments(maybe will be moved into user routes)
router.get(
    '/own',
    async (req, res) => {
        
    }
);

// create a new comment
router.post(
    '/create',
    async (req, res) => {
        try {
            const {userId, productId, text, positive} = req.body;
            const comment = new Message({
                user: userId,
                product: productId,
                text,
                positive
            });

            await comment.save();

            return res.status(200).json({
                message: 'Ваш відгук успішно записано',
                success: true
            });
        } catch(e) {
            return res.status(400).json({
                message: 'Ви можете залишити лише один відгук для окремого товару!',
                success: false
            });
        }
    }
);

router.put(
    '/update',
    async (req, res) => {
        try {
            const {userId, productId} = req.body;

            let comment = await Message.findOne({user: userId, product: productId});

            if(!comment) {
                return res.status(400).json({
                    message: 'Коментар на оновлення не знайдено',
                    success: false
                });
            }

            comment = Object.assign(comment, req.body);
            await comment.save();

            return res.status(200).json({
                message: 'Ваш коментар успішно оновлено!',
                success: true
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося оновити Ваш коментар; ${e.message}`,
                success: false
            });
        }
    }
);

router.put(
    '/delete',
    async (req, res) => {
        
    }
);

module.exports = router;
