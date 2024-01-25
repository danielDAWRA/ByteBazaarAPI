import orderProductsModel from './orderProducts.model.js';

async function getProductGameTitleFromOrder({ orderId }) {
  const productGameTitleFromOrder = await orderProductsModel
    .find({ orderId })
    .populate({
      path: 'productId',
    })
    .limit(1)
    .lean();

  return productGameTitleFromOrder[0];
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getProductGameTitleFromOrder,
};
