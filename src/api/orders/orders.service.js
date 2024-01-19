import * as ordersRepository from './orders.repository.js';

async function getOrdersByUserId({ userId }) {
  const orders = await ordersRepository.getOrdersByUserId({ userId });
  return orders;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getOrdersByUserId,
};
