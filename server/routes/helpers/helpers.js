const { format } = require('date-fns');
const ua = require('date-fns/locale/uk');
const User = require('./../../models/User.model');
const Category = require('./../../models/Category.model');

// remove unnecessary data before sending a response
const deleteUserPrivateInfo = (user) => {
    delete user.__v;
    delete user.password;
    delete user._id;

    return user;
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
            message: 'Помилка, юзера не знайдено',
            success: false
        });
    }
}

// find category in a route by name(not a middleware)
const categoryByName = async (name) => {
    try {
        const category = await Category.find({name});

        if(!category.length) {
            return null;
        }

        return category[0]._id;
    } catch(e) {
        return e.message;
    }
}

module.exports = {
    deleteUserPrivateInfo,
    parseDateUkr,
    userById,
    categoryByName
};