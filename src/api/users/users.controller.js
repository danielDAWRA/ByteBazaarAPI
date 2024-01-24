import * as usersService from './users.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const user = await usersService.getById({ id });
  res.json(user);
}

async function getProfileById(req, res) {
  const { _id } = req.user;
  const profile = await usersService.getProfileById({ _id });
  return res.json({ profile });
}

export {
  getById,
  getProfileById,
};
