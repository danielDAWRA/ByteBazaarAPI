import * as usersService from './users.service.js';

async function getById(req, res) {
  const { id } = req.params;
  console.log(id);
  const user = await usersService.getById({ id });
  res.json(user);
}

export default {
  getById,
};
