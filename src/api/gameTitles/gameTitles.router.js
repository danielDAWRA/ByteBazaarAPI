import Router from 'express';
import * as gameTitlesController from './gameTitles.controller.js';

const router = Router();

router.get('/all', gameTitlesController.getAllTitles); // this route must be before '/:id'
router.get('/:id', gameTitlesController.getById);
router.get('/productId/:id', gameTitlesController.getByProductId);
export default router;
