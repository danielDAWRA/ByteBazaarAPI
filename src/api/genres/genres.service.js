import * as genresRepository from './genres.repository.js';

async function getGenreById(id) {
  const genre = await genresRepository.getGenreById(id);
  return genre;
}

// eslint-disable-next-line import/prefer-default-export
export { getGenreById };
