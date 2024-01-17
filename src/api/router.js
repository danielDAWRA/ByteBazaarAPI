import Router from 'express';

import gameTitlesRouter from './gameTitles/gameTitles.router.js';
import platformsRouter from './platforms/platforms.router.js';
import productsRouter from './products/products.router.js';
import ordersRouter from './orders/orders.router.js';

const router = Router();

router.use('/gameTitles', gameTitlesRouter);
router.use('/orders', ordersRouter);
router.use('/platforms', platformsRouter);
router.use('/products', productsRouter);

export default router;
