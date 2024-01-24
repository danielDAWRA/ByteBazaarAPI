import Router from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/:id', usersController.getById);
router.get('/byEmail/:email', usersController.getByEmail);

export default router;
