import * as usersService from './users.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const user = await usersService.getById({ id });
  res.json(user);
}

async function getProfile(req, res) {
  return res.json({ user: req.user });
}

export {
  getById,
  getProfile,
};
