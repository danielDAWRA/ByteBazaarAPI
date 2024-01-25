import * as usersService from './users.service.js';

async function getById(req, res) {
  console.log(req.user._id.valueOf());
  const { id } = req.params;
  const user = await usersService.getById({ id });
  res.json(user);
}

async function getProfileById(req, res) {
  const id = req.user._id.valueOf();
  const profile = await usersService.getProfileById({ id });
  return res.json(profile);
}

export {
  getById,
  getProfileById,
};
