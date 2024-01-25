import Router from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/id/:id', usersController.getById);
// updated getById path as the path "/profile" was being interpreted as a params of getById!!
router.get('/profile', usersController.getProfile);

export default router;
