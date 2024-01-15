import userModel from './users.model.js';

async function getById({ id }) {
  console.log(id);
  const user = await userModel.findById(id).lean();
  console.log(user);
  // key put in as a string because using subkey in mongoose.
  return user;
}

export default {
  getById,
};
