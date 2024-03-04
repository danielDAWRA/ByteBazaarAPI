import * as usersService from './users.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const user = await usersService.getById({ id });
  res.json(user);
}

async function patch(req, res) {
  const { user } = req;
  const newProps = req.body;
  // We only let user change his name,lastName and password fields
  // and delete other fields in case they come in the body
  const {
    email,
    credit,
    idAdmin,
    ...allowedChanges
  } = newProps;

  const userUpdatedValues = await usersService.patch({ user, allowedChanges });
  res.json(userUpdatedValues);
}

export {
  getById,
  patch,
};
