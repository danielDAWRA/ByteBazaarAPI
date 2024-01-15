import Router from 'express';
import * as genresController from './genres.controller.js';

const router = Router();

router.get('/byId/:id', genresController.getGenreById);

export default router;
