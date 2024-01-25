import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const orderProductSchema = new Schema({
  productId: {
    type: ObjectId,
    ref: 'Product',
  },
  orderId: {
    type: ObjectId,
    ref: 'order',
  },
  quantity: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderProductsModel = model('orderProduct', orderProductSchema, 'orderProducts');
export default orderProductsModel;
