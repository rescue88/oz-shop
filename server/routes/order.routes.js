const { Router } = require('express');

const Order = require('./../models/Order.model');
const User = require('./../models/User.model');
const { parseDateUkr } = require('./helpers/helpers');

const router = Router();

// get all orders
router.get(
    '/',
    async(req, res) => {
        try {
            const {status} = req.query;
            let orders;
            
            if(status !== undefined) {
                orders = await Order.find({status});
            } else {
                orders = await Order.find({}, {__v: 0});
            }

            if(!orders.length) {
                return res.status(200).json({
                    message: 'Список замовлень порожній',
                    success: true,
                });
            }

            for(let i = 0; i < orders.length; i++) {
                orders[i]._doc.created = parseDateUkr(orders[i]._doc.created, 'PP');
                orders[i]._doc.amount = orders[i]._doc.products.length;
                delete orders[i].products;
            }

            return res.status(200).json({
                message: 'Список замовлень успішно отримано',
                success: true,
                orders
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося отримати замовлення; ${e.message}`,
                success: false
            });
        }
    }
);

// get user's own orders
router.get(
    '/own',
    async (req, res) => {
        try {
            const {id} = req.query;
            
            const orders = await Order.find({user: id}, {products: 1, price: 1, created: 1, status: 1});
            if(!orders.length) {
                return res.status(200).json({
                    message: 'Ви ще здійснювали замовлень',
                    success: true
                });
            }

            for(let i = 0; i < orders.length; i++) {
                orders[i]._doc.created = parseDateUkr(orders[i]._doc.created, 'PP');
                orders[i]._doc.amount = orders[i]._doc.products.length;
                delete orders[i].products;
            }

            return res.status(200).json({
                message: 'Історію власних замовлень успішно отримано',
                success: true,
                orders
            });
        } catch(e) {
            return res.status(400).json({
                message: `Не вдалося отримати замовлення окремого юзера; ${e.message}`,
                success: false
            });
        }
    }
)

// create new order
router.post(
    '/create',
    async (req, res) => {
        try {
            if(req.body.user) {
                const user = await User.findById(req.body.user);

                req.body.name = user._doc.name;
                req.body.email = user._doc.email;
                req.body.phone = user._doc.phone;

                const newOrder = new Order({...req.body});

                await newOrder.save();
            } else {
                const newOrder = new Order({...req.body});

                await newOrder.save();
            }

            return res.status(200).json({
                message: 'Замовлення успішно оформлено',
                success: true
            });
        } catch(e) {
            return res.status(400).json({
                message: `Помилка в оформленні замовлення; ${e.message}`,
                success: false
            });
        }
    }
);

// update order status
router.put(
    '/update',
    async (req, res) => {
        try {
            const {id, status} = req.query;
            
            let order = Order.findById(id);

            if(!order) {
                return res.status(400).json({
                    message: 'Замовлення з даним ідентифікатором не існує',
                    success: false
                });
            }

            order.status = status;

            await order.save();

            return res.status(200).json({
                message: 'Статус замовлення успішно оновлено',
                success: true,
            });
        } catch(e) {
            return res.status(400).json({
                message: `Помилка при оновленні замовлення; ${e.message}`,
                success: false
            })
        }
    }
);

// delete order by id
router.delete(
    '/delete',
    async (req, res) => {
        try {
            const {id} = req.params;

            const order = await Order.findById(id);
            if(!order) {
                return res.status(400).json({
                    message: 'Замовлення з даним ідентифікатором не існує',
                    success: false
                });
            }

            await order.remove();

            return res.status(200).json({
                message: 'Замовлення успішно видалено',
                success: true
            });
        } catch(e) {
            return res.status(400).json({
                message: `Помилка при видаленні замовлення; ${e.message}`,
                success: true
            });
        }
    }
)

module.exports = router;