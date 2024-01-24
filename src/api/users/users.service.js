import * as usersRepository from './users.repository.js';

async function getById({ id }) {
  const user = await usersRepository.getById({ id });
  return user;
}

async function getProfileById({ _id }) {
  const profile = await usersRepository.getProfileById({ _id });
  return profile;
}

export {
  getById,
  getProfileById,
};
