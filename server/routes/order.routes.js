const { Router } = require('express');

const Order = require('./../models/Order.model');

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

// create new order
router.post(
    '/create',
    async (req, res) => {
        try {
            const newOrder = new Order({...req.body});

            await newOrder.save();

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