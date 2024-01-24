import * as usersRepository from './users.repository.js';

async function getById({ id }) {
  const user = await usersRepository.getById({ id });
  return user;
}

async function getByEmail({ email }) {
  const user = await usersRepository.getByEmail({ email });
  return user;
}

export {
  getById,
  getByEmail,
};
