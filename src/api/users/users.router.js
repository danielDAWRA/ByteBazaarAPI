import Router from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/id/:id', usersController.getById);
router.get('/profile', usersController.getProfile);
router.get('/byEmail/:email', usersController.getByEmail);

export default router;
