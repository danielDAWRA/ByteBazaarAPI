import { Schema, model } from 'mongoose';

const gameTitlesSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },

});

const gameTitleModel = model('GameTitle', gameTitlesSchema, 'gameTitles');

export default gameTitleModel;
