import genreModel from './genres.model.js';

async function getAll() {
  const genres = await genreModel.find({}).lean();
  return genres;
}

async function getGenreById(id) {
  const genre = await genreModel.findById(id).lean();
  return genre;
}

export {
  getGenreById,
  getAll,
};
