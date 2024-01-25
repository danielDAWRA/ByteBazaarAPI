import productsModel from './products.model.js';
import * as orderProductsRepository from '../orderProducts/orderProducts.repository.js';

async function getAll() {
  const products = await productsModel
    .find()
    .sort({ listedDate: -1 })
    .lean();
  return products;
}

async function getById({ id }) {
  const user = await productsModel.findById(id).lean();
  return user;
}

async function getLastOrderProducts({ orderId }) {
  const products = await orderProductsRepository.getProductGameTitleFromOrder({ orderId });
  return products;
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

export {
  getAll,
  getById,
  getLastOrderProducts,
  getRecommended,
};
