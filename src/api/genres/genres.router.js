import Router from 'express';
import * as genresController from './genres.controller.js';

const router = Router();

router.get('/all', genresController.getAll);
router.get('/:id', genresController.getById);

export default router;
