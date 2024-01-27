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
  },
  total: {
    type: Number,
    required: true,
  },
});

const orderModel = model('Order', ordersSchema);
export default orderModel;
