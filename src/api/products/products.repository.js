import productsModel from './products.model.js';

async function getAll() {
  const products = await productsModel
    .find({})
    .sort({ listedDate: -1 })
    .lean();
  return products;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getAll,
};
