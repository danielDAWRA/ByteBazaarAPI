import Router from 'express';

// import authRouter from './auth/auth.router.js';
import gameTitlesRouter from './gameTitles/gameTitles.router.js';
import platformsRouter from './platforms/platforms.router.js';
import productsRouter from './products/products.router.js';

const router = Router();

// router.use('/auth', authRouter);
router.use('/gameTitles', gameTitlesRouter);
router.use('/platforms', platformsRouter);
router.use('/products', productsRouter);

export default router;
