import { Schema, model } from 'mongoose';

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const genreModel = model('Genre', genreSchema);
export default genreModel;
