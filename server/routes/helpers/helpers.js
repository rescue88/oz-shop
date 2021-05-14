const { format } = require('date-fns');
const ua = require('date-fns/locale/uk');
const User = require('./../../models/User.model');
const Category = require('./../../models/Category.model');
const Product = require('./../../models/Product.model');

// remove unnecessary data before sending a response
const deleteUnnecessaryInfo = (doc, modelName = '') => {
    delete doc.__v;
    if(modelName === 'user') {
        delete doc.password;
        delete doc._id;
    }

    return doc;
}

// parsing date in a ua format: Day Month Year
const parseDateUkr = (date, template) => {
    return format(date, template, {locale: ua})
}

// middleware to find a user
const userById = async (req, res, next) => {
    try {
        let user;
        if(Object.keys(req.query).length) {
            user = await User.findById(req.query.id);
        } else {
            user = await User.findById(req.params.id);
        }

        if(!user) {
            return res.status(400).json({
                message: 'Юзера з даним ідентифікатором не існує',
                success: false
            });
        }

        req.profile = user;
        next();
    } catch(e) {
        return res.status(400).json({
            message: `Помилка, юзера не знайдено; ${e.message}`,
            success: false
        });
    }
}

// find category in a route by name(not a middleware)
const categoryByName = async (name) => {
    try {
        const category = await Category.findOne({name});

        if(!category) {
            return null;
        }

        return category._id;
    } catch(e) {
        return null;
    }
}

// find category by label
const categoryByLabel = async (label) => {
    try {
        const category = await Category.findOne({label});

        if(!category) {
            return null;
        }

        return category._id;
    } catch(e) {
        return null;
    }
}

// find product by id
const productById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(400).json({
                message: 'Не вдалося знайти товар із заданими ідентифікатором',
                success: false
            });
        }

        req.product = product;
        next();
    } catch(e) {
        return res.status(400).json({
            message: `Не вдалося знайти товар із заданими ідентифікатором; ${e.message}`,
            success: false
        });
    }
}

// retrieve users own favorites middleware
const retrieveFavorites = async (req, res, next) => {
    try {
        const {favorites} = req.profile;

        if(!favorites.length) {
            req.favorites = [];

            next();
        }
        
        let products = await Product.find({}, {image: 1, name: 1, price: 1, amount: 1});

        products = products.filter(item => favorites.includes(item._doc._id));
        products.map(item => {
            if(!item.image.data) {
                item.image.data = null;
            }
            return item;
        });
        
        req.favorites = products;

        next();
    } catch(e) {
        return res.status(400).json({
            message: `Невдала спроба отримати обрані товари; ${e.message}`,
            success: false
        });
    }
}

module.exports = {
    deleteUnnecessaryInfo,
    parseDateUkr,
    userById,
    categoryByName,
    categoryByLabel,
    productById,
    retrieveFavorites
};