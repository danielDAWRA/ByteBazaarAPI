import * as productsService from './products.service.js';

async function getAll(req, res) {
  const products = await productsService.getAll();
  res.json({ products });
}

async function getById(req, res) {
  const product = await productsService.getById();
  res.json({ product });
}

export {
  getAll,
  getById,
};
