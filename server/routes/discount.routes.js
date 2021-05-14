const { Router } = require('express');
const formidable = require('formidable');
const fs = require('fs');

const { Discount } = require('./../models/Discount.model');
const { discountById } = require('./helpers/helpers');

const router = Router();

// get all available discounts
router.get(
    '/',
    async (req, res) => {
        try {
            const discounts = await Discount.find({});

            if(!discounts.length) {
                return res.status(400).json({
                    message: "Ви не додали жодної знижки",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Наявні знижки успішно отримано",
                success: true
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося отримати знижки; ${e.message}`,
                success: false
            });
        }
    }
);

// create new discount
router.post(
    '/create',
    async (req, res) => {
        let form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files) => {
            if(err) {
                return res.status(400).json({
                    message: "Не вдалося створити новий продукт",
                    success: false
                });
            }

            // check if discount already exists
            const candidate = await Discount.findOne({name: fields.name});
            if(candidate) {
                return res.status(400).json({
                    message: "Знижка з такою назвою вже є",
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

            try {
                const discount = new Discount({...fields});

                await discount.save();

                return res.status(200).json({
                    message: "Знижку успішно додано",
                    success: true
                });
            } catch(e) {
                return res.status(400).json({
                    message: `Не вдалося створити нову знижку; ${e.message}`,
                    success: false
                });
            }
        });
    }
);

// update discount
router.put(
    '/update',
    discountById,
    async(req, res) => {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if(err) {
                return res.status(400).json({
                    message: "Не вдалося оновити дані знижки",
                    success: false
                });
            }

            let discount = req.discount;

            // if file recieved, save two necessary fields to store in db
            if(files.image) {
                discount.image.data = fs.readFileSync(files.image.path);
                discount.image.contentType = files.image.type;
            } else {
                delete fields.image;
            }

            // combine newer fields with older
            discount = Object.assign(discount, fields); 

            try {
                await discount.save();

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

// delete discount
router.delete(
    '/delete',
    async(req, res) => {

    }
);

module.exports = router;