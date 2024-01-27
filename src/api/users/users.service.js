import * as usersRepository from './users.repository.js';

async function getById({ id }) {
  const user = await usersRepository.getById({ id });
  return user;
}

async function updateCredit({ user, paymentMethod, total }) {
  const currentCredit = user[paymentMethod];
  if (total > currentCredit) {
    return 'Insufficient funds';
  }
  const updatedUserData = await usersRepository.updateCredit({ user, paymentMethod, total });
  const updatedCredit = updatedUserData[paymentMethod];
  return updatedCredit;
}

export {
  getById,
  updateCredit,
};
