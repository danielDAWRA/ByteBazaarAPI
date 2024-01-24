import genreModel from './genres.model.js';

async function getGenreById(id) {
  const genre = await genreModel.findById(id).lean();
  return genre;
}

async function getGenreByName(genreName) {
  const genre = await genreModel.findOne({ name: genreName });
  return genre;
}

async function createGenre(genre) {
  // eslint-disable-next-line new-cap
  const newGenre = new genreModel({ genre });
  await newGenre.save();
  return newGenre;
}

async function createManyGenres(genres) {
  const newGenres = await genreModel.insertMany(genres);
  return newGenres;
}

export {
  getGenreById,
  getGenreByName,
  createGenre,
  createManyGenres,
};
