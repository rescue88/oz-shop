const { format } = require('date-fns');
const ua = require('date-fns/locale/uk');

const User = require('./../../models/User.model');
const Category = require('./../../models/Category.model');
const Product = require('./../../models/Product.model');
const Discount = require('./../../models/Discount.model');
const Rating = require('./../../models/Rating.model');

// parsing date in a ua format: Day Month Year
const parseDateUkr = (date, template) => {
    return format(date, template, {locale: ua})
}

// middleware to find a user
const userById = async (req, res, next) => {
    try {
        let user;
        if(Object.keys(req.query).length) {
            user = await User.findOne({_id: req.query.id}, {__v: 0, password: 0});
        } else {
            user = await User.findOne({_id: req.params.id}, {__v: 0, password: 0});
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

// get a label name by category id
const categoryLabelById = async (_id) => {
    try {
        const category = await Category.findById(_id);

        return category.label;
    } catch(e) {
        return "Не визначено";
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
        const product = await Product.findOne({_id: req.params.id}, {__v: 0});

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

// find discount by id
const discountById = async (req, res, next) => {
    try {
        const discount = await Discount.findById(req.params.id);

        if(!discount) {
            return res.status(400).json({
                message: 'Не вдалося знайти знижку із заданими ідентифікатором',
                success: false
            });
        }

        req.discount = discount;
        next();
    } catch(e) {
        return res.status(400).json({
            message: `Не вдалося знайти знижку із заданими ідентифікатором; ${e.message}`,
            success: false
        });
    }
}

// retrieve product's rating
const retrieveProductRating = async (productId) => {
    let rating = await Rating.find({product: productId}, {_id: 0, mark: 1});
    if(!rating.length) return 0; 
    // if only 1 mark, return it
    else if(rating.length === 1) return rating[0].mark;
    // get an average rating
    else {
        rating = (rating.reduce((sum, plus) => sum + plus.mark, 0) / rating.length).toFixed(1);
        return rating;
    }
}

// retrieve comment authors data
const retrieveCommentAuthor = async (userId) => {
    const user = await User.findOne({_id: userId}, {_id: 0, avatar: 1, login: 1});

    return user._doc;
}

const retriveProductComment = async (productId) => {
    const product = await Product.findOne({_id: productId}, {_id: 0, image: 1, name: 1});

    return product._doc;
}

module.exports = {
    parseDateUkr,
    userById,
    categoryLabelById,
    categoryByName,
    categoryByLabel,
    productById,
    retrieveFavorites,
    discountById,
    retrieveProductRating,
    retrieveCommentAuthor,
    retriveProductComment
};