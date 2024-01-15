import Router from 'express';
import genresRouter from './genres/genres.router.js';

import authRouter from './auth/auth.router.js';
import platformsRouter from './platforms/platforms.router.js';
import productsRouter from './products/products.router.js';

const router = Router();

router.use('/genres', genresRouter);

router.use('/platforms', platformsRouter);
router.use('/products', productsRouter);

export default router;
