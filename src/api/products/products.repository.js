import productsModel from './products.model.js';

async function getAll({ skip, limit }) {
  const products = await productsModel
    .find({})
    .select('stock price')
    .populate({ path: 'gameTitle_id', select: '-_id -description' })
    .populate({ path: 'platform_id', select: '-_id' })
    .sort({ listedDate: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  return products;
}

async function getById({ id }) {
  const user = await productsModel.findById(id).lean();
  console.log('user', user);
  return user;
}

async function getPriceById({ id }) {
  const priceData = await productsModel.findById(id)
    .select('price -_id')
    .lean();
  const { price } = priceData;
  return price;
}

async function updateStock({ id, quantity }) {
  const currentStock = await productsModel
    .findByIdAndUpdate(
      { _id: id },
      { inc$: { stock: -2 } },
    );
  return currentStock;
}

export {
  getAll,
  getById,
  getPriceById,
  updateStock,
};
