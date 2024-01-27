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
  const product = await productsModel.findById(id).lean();
  return product;
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

const getRelated = async ({ gameTitleIds, product, limit = 3 }) => {
  const relatedProducts = await productsModel
    .aggregate([
      { $match: { _id: { $ne: product }, gameTitle_id: { $in: gameTitleIds } } },
      { $sample: { size: limit } },
    ])
    .exec();

  return relatedProducts;
};

export {
  getAll,
  getById,
  getRecommended,
  getRelated,
};
