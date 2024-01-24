import * as productsService from './products.service.js';

async function getAll(req, res) {
  const products = await productsService.getAll();
  res.json({ products });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getAll,
};
