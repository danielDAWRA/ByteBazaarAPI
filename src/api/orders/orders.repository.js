import ordersModel from './orders.model.js';

async function getOrdersByUserId({ userId }) {
  const orders = await ordersModel
    .find({ _id: userId })
    .sort({ date: -1 })
    .lean();
  return orders;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getOrdersByUserId,
};
