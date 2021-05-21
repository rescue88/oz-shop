const { Router } = require('express');
const formidable = require('formidable');
const fs = require('fs');

const Product = require('./../models/Product.model');
const { productById, categoryByLabel, parseDateUkr, retrieveProductRating, categoryLabelById } = require('./helpers/helpers');

const router = Router();

// get all products
router.get(
    '/',
    async (req, res) => {
        try {
            let products = await Product.find({}, {__v: 0});

            // check if no product documnts in db
            if(!products.length) {
                return res.status(200).json({
                    message: 'Товари ще не додано',
                    success: true,
                });
            }

            // write an average rating into every product
            for(let i = 0; i < products.length; i++) {
                products[i]._doc.rating = await retrieveProductRating(products[i]._doc._id);
                if(!products[i]._doc.image.data) {
                    products[i]._doc.image.data = null;
                }
                products[i]._doc.category = await categoryLabelById(products[i]._doc.category);
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

// get newest products to dispaly them on the home page
router.get(
    '/latest',
    async (req, res) => {
        try {
            let products = await Product.find({}, {image: 1, name: 1, price: 1}).sort({created: 'desc'}).limit(10);
            if(!products.length) {
                return res.status(400).json({
                    message: 'Здається, товари ще не додано',
                    success: true
                });
            }

            return res.status(200).json({
                message: 'Успішно отримано найновіші продукти',
                success: true,
                products
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося отримати найновіші товари; ${e.message}`,
                success: false
            });
        }
    }
);

// router.get(
//     '/rating',
//     async (req, res) => {
//         try {
//             let products = await Product.find({}, {image: 0}).sort({rating: 'desc'})
//         }
//     }
// )

// get product by id
router.get(
    '/:id',
    productById,
    async(req, res) => {
        try {
            let product = req.product._doc;
            // parse product creation date into understandable form
            product.created = parseDateUkr(product.created, 'PP');
            // get product average rating
            product.rating = await retrieveProductRating(req.product._id);
            // get a category label
            product.category = await categoryLabelById(product.category);

            return res.status(200).json({
                message: 'Інформацію про продукт успішно отримано',
                success: true,
                product
            });
        } catch(e) {
            return res.status(400).json({
                message: 'Не вдалося отримати інформацію про продукт',
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

            // retrieve category id
            fields.category = await categoryByLabel(fields.category);

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
                    message: `Не вдалося оновити продукт; ${e.message}`,
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