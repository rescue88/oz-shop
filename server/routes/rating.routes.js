const { Router } = require('express');

const Rating = require('./../models/Rating.model');
const { deleteUnnecessaryInfo } = require('./helpers/helpers');

const router = Router();

// get all ratings
router.get(
    '/',
    async (req, res) => {
        try {
            const ratings = await Rating.find({});

            if(!ratings.length) {
                return res.status(400).json({
                    message: 'Жоден товар ще не оцінено',
                    success: false,
                });
            }

            return res.status(200).json({
                message: 'Знижки успішно отримано',
                success: true,
                ratings
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося отримати рейтинги; ${e.message}`,
                success: false,
            });
        }
    }
);

// get users own rating for a current product page
router.get(
    '/own',
    async (req, res) => {
        const {userId, productId} = req.query;

        let rating = await Rating.findOne({user: userId, product: productId});
        if(!rating) {
            return res.status(200).json({
                message: 'Ви ще не залишили рейтинг для даного товару',
                success: false,
                rating: null
            });
        }

        rating = deleteUnnecessaryInfo(rating._doc, 'rating');

        return res.status(200).json({
            message: 'Ваш рейтинг для даного товару успішно отримано',
            success: true,
            rating: rating.mark
        });
    }
)

// create a rating retrieving both user and product
router.post(
    '/create',
    async (req,res) => {
        try {
            const {userId, productId, mark} = req.body;

            const rating = new Rating({
                user: userId,
                product: productId,
                mark
            });
            await rating.save();

            return res.status(200).json({
                message: "Нова оцінка успішно додана",
                success: true,
                rating: mark
            });
        } catch(e) {
            return res.status(400).json({
                message: 'Неможливо додати декілька оцінок одному товару!',
                success: false
            });
        }
    }
);

router.put(
    '/update',
    async (req, res) => {
        try {
            const {userId, productId, mark} = req.body;
            let rating = await Rating.findOne({user: userId, product: productId});

            if(!rating) {
                return res.status(400).json({
                    message: 'Неможливо оновити неіснуючий рейтинг',
                    success: false
                });
            }

            rating = Object.assign(rating, req.body);
            await rating.save();

            return res.status(200).json({
                message: 'Ваш рейтинг для товару успішно оновлено',
                success: true,
                rating: mark
            });
        } catch(e) {
            return res.status(200).json({
                message: `Не вдалося оновити рейтинг для даного товару; ${e.message}`,
                success: false
            });
        }
    }
)

module.exports = router;

