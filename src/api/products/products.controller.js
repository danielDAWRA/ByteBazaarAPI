import * as productsService from './products.service.js';

async function getAll(req, res) {
  const { skip, limit } = req.query;
  const products = await productsService.getAll({ skip, limit });
  res.json({ products });
}

async function getRecommended(req, res) {
  const userId = req.user._id;
  const products = await productsService.getRecommended({ userId });
  res.json({ products });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getAll,
  getRecommended,
};
