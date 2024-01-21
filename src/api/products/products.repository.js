import productsModel from './products.model.js';

// ask Jona if it needs skip & limit. Do not return unnecessary fields
async function getAll() {
  const products = await productsModel
    .find({})
    .populate({ path: 'gameTitle_id', select: '-_id' })
    .sort({ listedDate: -1 })
    .lean();
  return products;
}

async function getById({ id }) {
  const user = await productsModel.findById(id).lean();
  console.log('user', user);
  return user;
}

export {
  getAll,
  getById,
};
