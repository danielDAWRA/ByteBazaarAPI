import Router from 'express';
import * as productsController from './products.controller.js';

const router = Router();

router.get('/all', productsController.getAll);
router.get('/:id', productsController.getById);
router.get('/recommended', productsController.getRecommended);
router.get('/related/:id', productsController.getRelated);
router.post('/buy', productsController.buy);

export default router;
