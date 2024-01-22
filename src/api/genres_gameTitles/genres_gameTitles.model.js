/* eslint-disable camelcase */

/**
 * Disabled eslint camelCase warning so it's more clear that the model
 * represents a relations between two collections.
 * i.e. Genre_GameTitleModel is a relation between Genre and GameTitle
 */

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
