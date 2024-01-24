import * as usersService from './users.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const user = await usersService.getById({ id });
  res.json(user);
}

async function getProfileById(req, res) {
  // console.log(req.user);
  // const { _id } = req.user;
  // console.log(_id);
  const _id = '65b16598a0b97d32adc737ab';
  const profile = await usersService.getProfileById({ _id });
  return profile;
}

export {
  getById,
  getProfileById,
};
