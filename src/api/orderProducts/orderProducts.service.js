import * as orderProductsRepo from './orderProducts.repository.js';

async function getProductGameTitleFromOrder({ orderId }) {
  const productGameTitleFromOrder = await orderProductsRepo
    .getProductGameTitleFromOrder({ orderId });
  return productGameTitleFromOrder;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getProductGameTitleFromOrder,
};
