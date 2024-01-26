import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const ordersSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
  },
});

const orderModel = model('order', ordersSchema);
export default orderModel;
