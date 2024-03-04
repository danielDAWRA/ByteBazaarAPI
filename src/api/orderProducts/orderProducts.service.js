import * as orderProductsRepo from './orderProducts.repository.js';

async function getProductGameTitleFromOrder({ orderId }) {
  const productGameTitleFromOrder = await orderProductsRepo
    .getProductGameTitleFromOrder({ orderId });
  return productGameTitleFromOrder;
}

async function log({ orderId, products }) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    product.orderId = orderId;
  }
  const res = await orderProductsRepo.log({ products });
  return res;
}

export {
  getProductGameTitleFromOrder,
  log,
};
