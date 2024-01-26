import * as ordersService from './orders.service.js';

async function getOrdersByUserId(req, res) {
  const { userId } = req.params;
  const orders = await ordersService.getOrdersByUserId({ userId });
  res.json(orders);
}

async function buy(req, res) {
  const { productId } = req.params;
  const userId = req.user._id;
  if (!userId) {
    res.status(401);
    return res.json({ msg: 'Please log in to buy product' });
  }
  let { quantity } = req.query;
  if (!quantity) {
    quantity = 1;
  }
  const purchase = await ordersService.buy({ productId, userId, quantity });
  return res.json({ purchase });
}

export {
  getOrdersByUserId,
  buy,
};
