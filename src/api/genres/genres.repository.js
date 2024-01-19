import genreModel from './genres.model.js';

async function getGenreById(id) {
  const genre = await genreModel.findById(id).lean();
  return genre;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getGenreById,
};
