import userModel from './users.model.js';

async function getById({ id }) {
  const user = await userModel.findById(id).lean();
  return user;
}

async function register({ user }) {
  const createdUser = await userModel.create(user);
  return createdUser;
}

async function validate({ email, validated = true }) {
  const user = await userModel.findOneAndUpdate({ email }, { validated });
  return user;
}

async function patch({ _id, newProps }) {
  const user = await userModel.findOneAndUpdate({ _id }, newProps, { new: true });
  return user;
}

export {
  getById,
  register,
  validate,
  patch,
};
