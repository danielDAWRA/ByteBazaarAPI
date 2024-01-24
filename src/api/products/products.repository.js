import productsModel from './products.model.js';

async function getAll() {
  const products = await productsModel
    .find({})
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
