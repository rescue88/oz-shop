const { Router } = require('express');
const Category = require('./../models/Category.model');

const router = Router();

// get all categories
router.get(
    '/',
    async (req, res) => {
        try {
            const categories = await Category.find({});

            if(!categories.length) {
                return res.status(400).json({
                    message: 'Жодної категорії не додано',
                    success: false,
                });
            }

            return res.status(200).json({
                message: 'Категорії успішно знайдено',
                success: true,
                categories
            });
        } catch(e) {
            return res.json({
                message: `Щось не так з роутом /category/ ${e.message}`,
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
            const {name} = req.body;

            const candidate = await Category.find({name});

            if(candidate.length) {
                return res.status(400).json({
                    message: "Ім'я категорії вже додано",
                    success: false,
                });
            }

            const category = new Category({...req.body});
            await category.save();

            return res.status(200).json({
                message: "Нова категорія товарів успішно додана",
                success: true
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалось додати нову категорію товарів; ${e.message}`,
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
    '/delete/:name',
    async (req, res) => {

    }
);

module.exports = router;