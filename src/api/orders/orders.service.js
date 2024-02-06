import * as ordersRepository from './orders.repository.js';

async function getOrdersByUserId({ userId }) {
  const orders = await ordersRepository.getOrdersByUserId({ userId });
  return orders;
}

async function log({ userId, total }) {
  const orderId = await ordersRepository.log({ userId, total });
  return orderId;
}

export {
  getOrdersByUserId,
  log,
};
