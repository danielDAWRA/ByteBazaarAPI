/* eslint-disable camelcase */
import { Schema, model } from 'mongoose';

const schema = new Schema({
  gameTitle_id: {
    type: Schema.Types.ObjectId,
    ref: 'GameTitle',
  },
  genre_id: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  },
});

const Genre_GameTitleModel = model('Genre_GameTitle', schema, 'genres_gameTitles');
export default Genre_GameTitleModel;
