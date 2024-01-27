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

async function getRecommended(req, res) {
  const userId = req.user._id;
  const products = await productsService.getRecommended({ userId });
  res.json({ products });
}

async function getRelated(req, res) {
  const { id } = req.params;
  const products = await productsService.getRelated({ id });
  res.json({ products });
}

async function buy(req, res) {
  const { body } = req;
  const { user } = req;
  const result = await productsService.buy({ orderData: body, user });
  if (result.error) {
    return res.json({
      msg: 'There is not enough stock of the following item/s to complete your order',
      products: result.error,
    });
  }
  if (typeof result === 'string') {
    res.status(400);
    return res.json({ msg: result });
  }
  return res.json(result);
}

export {
  getAll,
  getById,
  getRecommended,
  getRelated,
  buy,
};
