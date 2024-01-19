import userModel from './users.model.js';

async function getById({ id }) {
  const user = await userModel.findById(id).lean();
  return user;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
