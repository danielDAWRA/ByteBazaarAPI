import OrderProductsModel from './orderProducts.model.js';

async function getProductGameTitleFromOrder({ orderId }) {
  const productGameTitleFromOrder = await OrderProductsModel
    .findOne({ orderId })
    .populate({
      path: 'productId',
    });

  return productGameTitleFromOrder;
}

async function log({ products }) {
  const res = orderProductsModel.insertMany(products);
  return res;
}

export {
  getProductGameTitleFromOrder,
  log,
};
