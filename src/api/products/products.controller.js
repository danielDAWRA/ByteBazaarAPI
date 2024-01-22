import * as productsService from './products.service.js';

async function getAll(req, res) {
  const { query } = req;
  const { skip, limit } = query;
  const products = await productsService.getAll({ skip, limit });
  res.json({ products });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getAll,
};
