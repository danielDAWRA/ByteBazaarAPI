import Router from 'express';
import genresRouter from './genres/genres.router.js';

import gameTitlesRouter from './gameTitles/gameTitles.router.js';
import platformsRouter from './platforms/platforms.router.js';
import productsRouter from './products/products.router.js';
import usersRouter from './users/users.router.js';

const router = Router();

router.use('/genres', genresRouter);
router.use('/gameTitles', gameTitlesRouter);

router.use('/platforms', platformsRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);

export default router;
