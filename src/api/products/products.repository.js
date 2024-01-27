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
  return user;
}

async function getRecommended({ platformId, gameTitleIds }) {
  const recommendedProducts = await productsModel
    .find({
      platform_id: platformId,
      gameTitle_id: { $in: gameTitleIds },
    })
    .sort({ listedDate: -1 })
    .lean();

  return recommendedProducts;
}

async function getPricesAndStockById({ productIds }) {
  const pricesAndStock = await productsModel
    .find({ _id: { $in: productIds } })
    .select('price stock')
    .lean();
  return pricesAndStock;
}

async function updateStock({ products }) {
  const productsBulk = products.map((product) => ({
    updateOne: {
      filter: { _id: product.productId },
      update: { $inc: { stock: -product.quantity } },
    },
  }));
  const res = await productsModel.bulkWrite(productsBulk);
  return res;
}

export {
  getAll,
  getById,
  getRecommended,
  getPricesAndStockById,
  updateStock,
};
