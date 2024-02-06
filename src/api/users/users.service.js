import * as usersRepository from './users.repository.js';

async function getById({ id }) {
  const user = await usersRepository.getById({ id });
  return user;
}

async function getByEmail({ email }) {
  const user = await usersRepository.getByEmail({ email });
  return user;
}

async function updateCredit({ user, paymentMethod, total }) {
  const currentCredit = user[paymentMethod];
  if (total > currentCredit) {
    const result = {
      msg: 'Insufficient funds.',
      error: {
        [paymentMethod]: currentCredit,
      },
    };
    return result;
  }
  const updatedUserData = await usersRepository.updateCredit({ user, paymentMethod, total });
  const updatedCredit = updatedUserData[paymentMethod];
  return updatedCredit;
}

export {
  getById,
  getByEmail,
  updateCredit,
};
