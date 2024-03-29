import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const productsSchema = new Schema({
  gameTitle_id: {
    type: ObjectId,
    required: true,
    ref: 'GameTitle',
  },
  platform_id: {
    type: ObjectId,
    required: true,
    ref: 'Platform',
  },
  genres_ids: [{
    type: ObjectId,
    ref: 'Genre',
  }],
  stock: {
    type: Number,
    required: true,
  },
  listedDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genre_id: {
    type: ObjectId,
    ref: 'genres_gameTitles',
  },
});

const productModel = model('Product', productsSchema);
export default productModel;
