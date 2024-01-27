import * as ordersRepository from './orders.repository.js';
import * as productsService from '../products/products.service.js';

async function getOrdersByUserId({ userId }) {
  const orders = await ordersRepository.getOrdersByUserId({ userId });
  return orders;
}

async function buy({ productId, userId, quantity }) {
  const productPrice = await productsService.getPriceById({ id: productId });
  const total = productPrice * quantity;
  const orderId = await ordersRepository.log({ userId, total });
  // line to log orderProducts with orderId,productId,quantity and price
  const currentStock = await productsService.updateStock({ id: productId, quantity });
  return currentStock;
}

export {
  getOrdersByUserId,
  buy,
};
