import Router from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/id/:id', usersController.getById);

export default router;
