import OrdersModel from './orders.model.js';

async function getOrdersByUserId({ userId }) {
  const orders = await OrdersModel
    .find({ user_id: userId })
    .sort({ date: -1 })
    .lean();
  return orders;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getOrdersByUserId,
};
