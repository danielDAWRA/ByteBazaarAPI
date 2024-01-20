import userModel from './users.model.js';

async function getById({ id }) {
  const user = await userModel.findById(id).lean();
  return user;
}

async function getByEmail({ email }) {
  const user = await userModel.findOne({ email }).lean();
  return user;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
  getByEmail,
};
