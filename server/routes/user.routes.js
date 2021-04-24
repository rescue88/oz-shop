const { Router } = require('express');

const router = Router();

// get all users
router.get(
    '/',
    async (req, res) => {
        try {
            console.log("here");
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