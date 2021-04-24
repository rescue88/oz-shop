import { Router } from 'express';
import userCtrl from './../controllers/user.controller.js';
import authCtrl from './../controllers/auth.controller.js';

const router = Router();

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

router.param('userId', userCtrl.userByID);

router.route('/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

export default router;