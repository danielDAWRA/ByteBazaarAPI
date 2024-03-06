import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

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
  genres: [{
    type: ObjectId,
    ref: 'Genres_gameTitles',
  }],
});

const gameTitleModel = model('GameTitle', gameTitlesSchema, 'gameTitles');

export default gameTitleModel;
