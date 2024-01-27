import Router from 'express';
import * as productsController from './products.controller.js';

const router = Router();

router.get('/all', productsController.getAll);
router.get('/recommended', productsController.getRecommended);
router.post('/buy', productsController.buy);

export default router;
