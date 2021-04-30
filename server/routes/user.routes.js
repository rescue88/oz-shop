const { Router } = require('express');
const User = require('./../models/User.model');

const router = Router();

// get all users
router.get(
    '/',
    async (req, res) => {
        try {
            const users = await User.find();
            console.log(users)

            if(users) {
                return res.status(200).json({
                    users
                });
            }

            return res.status(400).json({
                message: 'Немає зареєстрованих юзерів'
            });
        } catch(e) {
            return res.status(400).json({
                message: e.message
            });
        }
    }
)
// find user by id
// router.param('userId', userCtrl.userByID);

// router.route('/:userId')
//     .get(authCtrl.requireSignin, userCtrl.read)
//     .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
//     .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

module.exports = router;