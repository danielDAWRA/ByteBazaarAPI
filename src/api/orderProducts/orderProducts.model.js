import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const orderProductSchema = new Schema({
  productId: {
    type: ObjectId,
    ref: 'product',
  },
  orderId: {
    type: ObjectId,
    ref: 'order',
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderProductsModel = model('orderProduct', orderProductSchema, 'orderProducts');
export default orderProductsModel;
