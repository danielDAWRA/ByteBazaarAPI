import * as productsService from './products.service.js';

async function getAll(req, res) {
  const { skip, limit } = req.query;
  const products = await productsService.getAll({ skip, limit });
  res.json({ products });
}

async function getRecommended(req, res) {
  // ponerlo por params o probar a pelo el de BD
  // const { _id } = req.user;
  const userId = '65b1592188e7a12afad2a5da';
  const products = await productsService.getRecommended({ userId });
  res.json({ products });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getAll,
  getRecommended,
};
