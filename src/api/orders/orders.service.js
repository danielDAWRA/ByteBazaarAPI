import * as ordersRepository from './orders.repository.js';

async function getOrdersByUserId({ userId }) {
  const orders = await ordersRepository.getOrdersByUserId({ userId });
  return orders;
}

async function buy({ productId, userId, quantity }) {

}

export {
  getOrdersByUserId,
  buy,
};
