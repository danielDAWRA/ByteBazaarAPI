import Router from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/:id', usersController.getById);
router.patch('/', usersController.patch);

export default router;
