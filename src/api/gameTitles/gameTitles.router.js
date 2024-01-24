import Router from 'express';
import * as gameTitlesController from './gameTitles.controller.js';

const router = Router();

router.get('/all', gameTitlesController.getAllTitles); // this line of code must be above the '/:id' route
router.get('/:id', gameTitlesController.getById);
router.get('/productId/:id', gameTitlesController.getByProductId);
router.post('/createTitle', gameTitlesController.createTitle);
export default router;
