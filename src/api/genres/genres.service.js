import * as genresRepository from './genres.repository.js';

async function getAll() {
  const genres = await genresRepository.getAll();
  return genres;
}

async function getGenreById(id) {
  const genre = await genresRepository.getGenreById(id);
  return genre;
}

export {
  getGenreById,
  getAll,
};
