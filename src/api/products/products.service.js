import * as productsRepository from './products.repository.js';

async function getAll() {
  const products = await productsRepository.getAll();
  return products;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getAll,
};
