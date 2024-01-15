import { Schema, model } from 'mongoose';

const platformsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const platformModel = model('Platform', platformsSchema);
export default platformModel;
