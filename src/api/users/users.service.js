import * as usersRepository from './users.repository.js';

async function getById({ id }) {
  const user = await usersRepository.getById({ id });
  return user;
}

async function getProfileById({ id }) {
  const profile = await usersRepository.getProfileById({ id });
  return profile;
}

export {
  getById,
  getProfileById,
};
