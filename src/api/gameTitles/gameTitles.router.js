import Router from 'express';
import * as gameTitlesController from './gameTitles.controller.js';

const router = Router();

router.get('/:id', gameTitlesController.getById);

export default router;
