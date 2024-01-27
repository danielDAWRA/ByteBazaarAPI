import Router from 'express';
import * as gameTitlesController from './gameTitles.controller.js';

const router = Router();

router.get('/all', gameTitlesController.getAll); // this line of code must be above the '/:id' route
router.get('/:id', gameTitlesController.getById);
router.get('/productId/:id', gameTitlesController.getByProductId);
router.post('/create', gameTitlesController.create);
export default router;
