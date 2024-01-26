import Router from 'express';
import * as ordersController from './orders.controller.js';

const router = Router();

router.get('/:userId', ordersController.getOrdersByUserId);
router.patch('/buy/:productId', ordersController.buy);

export default router;
