import * as usersService from './users.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const user = await usersService.getById({ id });
  res.json(user);
}

async function getByEmail(req, res) {
  const { email } = req.params;
  const user = await usersService.getByEmail({ email });
  res.json(user);
}

export {
  getById,
  getByEmail,
};
