const { Router } = require('express');
const Product = require('./../models/Product.model');
const { categoryByName, productById, deleteUnnecessaryInfo } = require('./helpers/helpers');

const router = Router();

// get all products
router.get(
    '/',
    async (req, res) => {
        try {
            let products = await Product.find({});

            if(!products.length) {
                return res.status(400).json({
                    message: 'Товари ще не додано',
                    success: false,
                });
            }

            products = products.map(item => {
                return deleteUnnecessaryInfo(item._doc, '');
            });

            return res.status(200).json({
                message: 'Товари завантажено успішно!',
                success: true,
                products: products
            });
        } catch(e) {
            return res.json({
                message: `Товари відсутні; ${e.message}`,
                success: false
            });
        }
    }
);

// add new product
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

// change product
router.put(
    '/update/:id',
    async (req, res) => {
        
    }
);

// delete product
router.delete(
    '/delete/:id',
    productById,
    async (req, res) => {
        try {
            const product = req.product;

            await product.remove();

            return res.status(200).json({
                message: 'Товар успішно видалено',
                success: true
            });
        } catch(e) {
            return res.status(200).json({
                message: `Не вдалося видалити товар; ${e.message}`,
                success: true
            });
        }
    }
);

module.exports = router;