const { Router } = require('express');
const formidable = require('formidable');
const fs = require('fs');

const User = require('./../models/User.model');
const Product = require('./../models/Product.model');
const { productById, deleteUnnecessaryInfo, categoryByLabel } = require('./helpers/helpers');

const router = Router();

// get all products
router.get(
    '/',
    async (req, res) => {
        try {
            let products = await Product.find({});

            // check if no product documnts in db
            if(!products.length) {
                return res.status(400).json({
                    message: 'Товари ще не додано',
                    success: false,
                });
            }

            // mapping to delete props like __v
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
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if(err) {
                return res.status(400).json({
                    message: "Не вдалося створити новий продукт",
                    success: false
                });
            }

            // check that we are adding original product name
            const candidate = await Product.findOne({name: fields.name});
            if(candidate) {
                return res.status(400).json({
                    message: "Товар з такою назвою вже є",
                    success: false
                });
            }

            // if file recieved, save two necessary fields to store in db
            if(files.image) {
                fields.image = {};
                fields.image.data = fs.readFileSync(files.image.path);
                fields.image.contentType = files.image.type;
            } else {
                delete fields.image;
            }

            // retrieve category id
            fields.category = await categoryByLabel(fields.category);

            try {
                const product = new Product({...fields});

                await product.save();

                return res.status(200).json({
                    message: 'Новий продукт успішно додано',
                    success: true
                });
            } catch(e) {
                return res.status(400).json({
                    message: `Не вдалося додати продукт; ${e.message}`,
                    success: false
                });
            }
        });
    }
);

// change product
router.put(
    '/update/:id',
    productById,
    async (req, res) => {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if(err) {
                return res.status(400).json({
                    message: "Не вдалося оновити дані продукта",
                    success: false
                });
            }

            let product = req.product;

            // if file recieved, save two necessary fields to store in db
            if(files.image) {
                product.image.data = fs.readFileSync(files.image.path);
                product.image.contentType = files.image.type;
            } else {
                delete fields.image;
            }

            // combine newer fields with older
            product = Object.assign(product, fields); 

            try {
                await product.save();

                return res.status(200).json({
                    message: 'Дані продукта успішно оновлено',
                    success: true
                });
            } catch(e) {
                return res.status(400).json({
                    message: 'Не вдалося оновити продукт',
                    success: false
                });
            }
        });
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

            let products = await User.find({});
            for(let i = 0; i < products.length; i++) {
                if(products[i].favorites.includes(product._id));
            }

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