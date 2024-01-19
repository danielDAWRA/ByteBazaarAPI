import * as productsRepository from './products.repository.js';

async function getAll() {
  const products = await productsRepository.getAll();
  return products;
}

async function getById({ id }) {
  const product = await productsRepository.getById({ id });
  return product;
}

export {
  getAll,
  getById,
};
