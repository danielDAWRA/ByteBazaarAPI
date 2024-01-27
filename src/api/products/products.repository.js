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

async function getRelated({ platformId, gameTitleIds, product }) {
  console.log('---Platform ID repo: ', platformId);
  console.log('---Game Title IDs repo: ', gameTitleIds);
  console.log('---Product ID repo: ', product);
  const relatedProducts = await productsModel
    .find({
      _id: { $ne: product },
      platform_id: platformId,
      gameTitle_id: { $in: gameTitleIds },
    }).limit(3);
  console.log('---recommendedProducts repository: ', relatedProducts);
  return relatedProducts;
}

export {
  getAll,
  getById,
  getRecommended,
  getRelated,
};
