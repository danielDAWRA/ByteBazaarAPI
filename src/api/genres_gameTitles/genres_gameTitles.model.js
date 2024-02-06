import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const genresGametitlesSchema = new Schema({
  genre_id: {
    type: ObjectId,
    ref: 'Genre',
  },
  gameTitle_id: {
    type: ObjectId,
    ref: 'GameTitle',
  },
});

const genresGameTitlesModel = model('Genres_gameTitles', genresGametitlesSchema, 'genres_gameTitles');
export default genresGameTitlesModel;
