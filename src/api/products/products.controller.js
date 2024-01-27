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

async function getRelated(req, res) {
  // const { skip, limit } = req.query;
  const { id } = req.params;
  console.log('-id controller: ', id);
  const products = await productsService.getRelated({ id });
  console.log('-products controller: ', products);
  res.json({ products });
}

export {
  getAll,
  getRecommended,
  getRelated,
};
