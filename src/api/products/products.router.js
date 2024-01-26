import Router from 'express';
import * as productsController from './products.controller.js';

const router = Router();

router.get('/all', productsController.getAll);
router.get('/:id', productsController.getById);

export default router;
