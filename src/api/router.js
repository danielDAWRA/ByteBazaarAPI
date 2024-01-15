import Router from 'express';
import genresRouter from './genres/genres.router.js';

const router = Router();

router.use('/genres', genresRouter);

export default router;
