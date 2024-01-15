import Router from 'express';

import authRouter from './auth/auth.router.js';
import gameTitlesRouter from './gameTitles/gameTitles.router.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/gameTitles', gameTitlesRouter);

export default router;
