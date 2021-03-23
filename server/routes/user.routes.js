import { Router } from 'express';
import userCtrl from './../controllers/user.controller.js';
import authCtrl from './../controllers/auth.controller.js';

const router = Router();

router.route('/api/users').post(userCtrl.create);

router.param('userId', userCtrl.userByID);

router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

export default router;