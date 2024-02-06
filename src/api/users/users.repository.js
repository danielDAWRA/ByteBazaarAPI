import UserModel from './users.model.js';

async function getById({ id }) {
  const user = await UserModel.findById(id).lean();
  return user;
}

async function getByEmail({ email }) {
  const user = await UserModel.findOne({ email }).lean();
  return user;
}

async function register({ user }) {
  const createdUser = await UserModel.create(user);
  return createdUser;
}

async function validate({ email }) {
  const user = await UserModel.findOneAndUpdate({ email }, { validated: true });
  return user;
}

async function updateCredit({ user, paymentMethod, total }) {
  const updatedUserData = await userModel.findOneAndUpdate(
    { _id: user._id },
    { $inc: { [paymentMethod]: -total } },
    { new: true },
  );
  return updatedUserData;
}

export {
  getById,
  getByEmail,
  register,
  validate,
  updateCredit,
};
