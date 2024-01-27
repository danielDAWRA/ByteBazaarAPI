import userModel from './users.model.js';

async function getById({ id }) {
  const user = await userModel.findById(id).lean();
  return user;
}

async function getByEmail({ email }) {
  const user = await userModel.findOne({ email }).lean();
  return user;
}

async function register({ user }) {
  const createdUser = await userModel.create(user);
  return createdUser;
}

async function validate({ email }) {
  const user = await userModel.findOneAndUpdate({ email }, { validated: true });
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
