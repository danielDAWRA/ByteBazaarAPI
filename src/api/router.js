import Router from 'express';

// import authRouter from './auth/auth.router.js';
import ordersRouter from './orders/orders.router.js';

const router = Router();

// router.use('/auth', authRouter);
router.use('/users', ordersRouter);

export default router;
