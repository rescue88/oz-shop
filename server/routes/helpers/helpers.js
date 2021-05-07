const { format } = require('date-fns');
const ua = require('date-fns/locale/uk');
const User = require('./../../models/User.model');

// remove unnecessary data before sending a response
const deleteUserPrivateInfo = (user) => {
    delete user.__v;
    delete user.password;
    delete user._id;

    return user;
}

const parseDateUkr = (date, template) => {
    return format(date, template, {locale: ua})
}

const userById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

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
            message: 'Відмовлено в редагуванні юзера',
            success: false
        });
    }
}

module.exports = {
    deleteUserPrivateInfo,
    parseDateUkr,
    userById
};