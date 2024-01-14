import * as ordersService from './orders.service.js';

async function getOrdersByUserId(req, res) {
  const { userId } = req.params;
  const orders = ordersService.getOrdersByUserId({ userId });
  res.json(orders);
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getOrdersByUserId,
};
