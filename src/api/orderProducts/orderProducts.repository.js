import OrderProductsModel from './orderProducts.model.js';

async function getProductGameTitleFromOrder({ orderId }) {
  const productGameTitleFromOrder = await OrderProductsModel
    .findOne({ orderId })
    .populate({
      path: 'productId',
    });

  return productGameTitleFromOrder;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getProductGameTitleFromOrder,
};
