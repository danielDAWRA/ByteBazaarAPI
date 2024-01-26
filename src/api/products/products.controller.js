import * as productsService from './products.service.js';

async function getAll(req, res) {
  const { skip, limit } = req.query;
  const products = await productsService.getAll({ skip, limit });
  res.json({ products });
}

async function getById(req, res) {
  const { id } = req.params;
  const product = await productsService.getById({ id });
  res.json({ product });
}

export {
  getAll,
  getById,
};
