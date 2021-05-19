const { Router } = require('express');

const User = require('./../models/User.model');
const Message = require('./../models/Message.model');
const { parseDateUkr, retrieveCommentAuthor, retriveProductComment } = require('./helpers/helpers');

const router = Router();

// get current product comments
router.get(
    '/product',
    async (req, res) => {
        try {
            const {productId} = req.query;
            let comments = await Message.find({product: productId}, {__v: 0});

            if(!comments.length) {
                return res.status(200).json({
                    message: 'Жодного коментаря ще не додано',
                    success: true,
                    comments: []
                });
            }

            for(let i = 0; i < comments.length; i++) {
                // find comment author
                let user = await retrieveCommentAuthor(comments[i].user);
                // combine two documents
                comments[i] = Object.assign(comments[i]._doc, user)
                // parse date
                comments[i].created = parseDateUkr(comments[i].created, 'PP');

                if(!comments[i].avatar.data) {
                    comments[i].avatar.data = null;
                }
            }

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
        try {
            const {user} = req.query;

            let comments = await Message.find({user}, {__v: 0});

            if(!comments.length) {
                return res.status(200).json({
                    message: 'Ви ще не залишили коментарів',
                    success: true,
                    comments: []
                });
            }

            for(let i = 0; i < comments.length; i++) {
                // find product
                let product = await retriveProductComment(comments[i].product);
                // combine two documents
                comments[i] = Object.assign(comments[i]._doc, product);
                // parse data
                comments[i].created = parseDateUkr(comments[i].created, 'PP');
            }

            return res.status(200).json({
                message: 'Власні коментарі успішно отримано',
                success: true,
                comments
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося отримати коментарі; ${e.message}`,
                success: false
            });
        }
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

// update your comment
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

// delete comment
router.delete(
    '/delete',
    async (req, res) => {
        try {
            const {user, product} = req.query;

            const comment = await Message.findOne({user, product});

            if(!comment) {
                return res.status(400).json({
                    message: 'Помилка, даного коментаря не існує',
                    success: false
                });
            }

            await comment.remove();

            return res.status(200).json({
                message: 'Відгук успішно видалено!',
                success: true
            });
        } catch(e) {
            return res.status(200).json({
                message: `Не вдалося видалити коментар; ${e.message}`,
                success: false
            });
        }
    }
);

module.exports = router;
