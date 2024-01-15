import { Schema, model } from 'mongoose';

const usersSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  secondSurname: {
    type: String,
  },
  licenceNumber: {
    type: String,
  },
  role: {
    type: String,
    default: 'staff',
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model('User', usersSchema, 'users');
export default userModel;
