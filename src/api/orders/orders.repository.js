import OrdersModel from './orders.model.js';

async function getOrdersByUserId({ userId }) {
  const orders = await OrdersModel
    .find({ user_id: userId })
    .sort({ date: -1 })
    .lean();
  return orders;
}

async function log({ userId, total }) {
  const order = await ordersModel.create({ user_id: userId, total });
  const { _id } = order;
  return _id;
}

export {
  getOrdersByUserId,
  log,
};
