import Router from 'express';
import * as platformsController from './platforms.controller.js';

const router = Router();

router.get('/:id', platformsController.getById);

export default router;
