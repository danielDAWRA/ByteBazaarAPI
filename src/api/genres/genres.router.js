import Router from 'express';
import * as genresController from './genres.controller.js';
import isAdmin from '../../middlewares/isAdmin.js';

const router = Router();

router.get('/all', isAdmin, genresController.getAll);
router.get('/:id', genresController.getGenreById);

export default router;
