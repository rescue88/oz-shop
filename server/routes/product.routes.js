const { Router } = require('express');
const Product = require('./../models/Product.model');
const { categoryByName } = require('./helpers/helpers');

const router = Router();

// get all categories
router.get(
    '/',
    async (req, res) => {
        try {
            const products = await Product.find({});

            if(!products.length) {
                return res.status(400).json({
                    message: 'Товари ще не додано',
                    success: false,
                });
            }

            return res.status(200).json({
                message: 'Товари завантажено успішно!',
                success: true,
                products
            });
        } catch(e) {
            return res.json({
                message: `Товари відсутні; ${e.message}`,
                success: false
            });
        }
    }
);

// add new category
router.post(
    '/create',
    async (req, res) => {
        try {
            let {
                name,
                category,
            } = req.body;

            const candidate = await Product.find({name});

            if(candidate.length) {
                return res.status(400).json({
                    message: "Товар з даним ім'ям уже існує!",
                    success: false,
                });
            }

            category = await categoryByName(category);
            if(category === null) {
                return res.status(400).json({
                    message: "Неможливо додати товар до існуючої категорії"
                });
            }

            req.body.category = category;
            const product = new Product({...req.body});
            await product.save();

            return res.status(200).json({
                message: "Новий товар успішно додано",
                success: true
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося додати товар; ${e.message}`,
                success: false
            });
        }
    }
);

// change category
router.put(
    '/update/:id',
    async (req, res) => {
        
    }
);

router.delete(
    '/delete/:id',
    async (req, res) => {

    }
);

module.exports = router;