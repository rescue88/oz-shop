import { Router } from 'express';
// import authCtrl from './../controllers/auth.controller.js';

const router = Router();

// try to auth
router.post(
    '/login',
    async (req, res) => {
        try {
            console.log("here");
        } catch(e) {
            return res.status(400).json({
                message: e.message
            });
        }
    }
);
// create user
router.get(
    '/register',
    async (req, res) => {
        try {

        } catch(e) {
            return res.status(400).json({
                message: e.message
            });
        }
    }
);

export default router;