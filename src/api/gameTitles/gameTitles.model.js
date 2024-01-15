import { Schema, model } from 'mongoose';

const gameTitlesSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const gameTitleModel = model('GameTitle', gameTitlesSchema);
export default gameTitleModel;
