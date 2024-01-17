import Router from 'express';
import * as authController from './auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.get('/validate/:emailToken', authController.confirm);

export default router;
