import Router from 'express';
import * as gameTitlesController from './gameTitles.controller.js';

const router = Router();

router.get('/:id', gameTitlesController.getById);
router.get('/all', gameTitlesController.getAllTitles);

export default router;
