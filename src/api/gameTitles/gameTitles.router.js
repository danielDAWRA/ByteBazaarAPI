import Router from 'express';
import * as gameTitlesController from './gameTitles.controller.js';

const router = Router();

router.get('/:id', gameTitlesController.getById);
router.get('/productId/:id', gameTitlesController.getByProductId);
export default router;
