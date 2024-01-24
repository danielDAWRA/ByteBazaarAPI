import userModel from './users.model.js';

async function getById({ id }) {
  const user = await userModel.findById(id).lean();
  return user;
}

async function getProfileById({ _id }) {
  const profile = await userModel.findById(_id).select('-_id -isAdmin -validated').lean();
  return profile;
}

async function register({ user }) {
  const createdUser = await userModel.create(user);
  return createdUser;
}

async function validate({ email }) {
  const user = await userModel.findOneAndUpdate({ email }, { validated: true });
  return user;
}

export {
  getById,
  getProfileById,
  register,
  validate,
};
