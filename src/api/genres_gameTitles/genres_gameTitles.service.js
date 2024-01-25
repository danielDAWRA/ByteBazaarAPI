import * as genresGameTitlesRepository from './genres_gameTitles.repository.js';

async function getGenresByGameTitleId({ gameTitleId }) {
  const genres = await genresGameTitlesRepository.getGenresByGameTitleId({ gameTitleId });
  return genres;
}

async function getGameTitlesByGenreIds({ genreIds }) {
  const gameTitles = await genresGameTitlesRepository
    .getGameTitlesByGenreIds({ genreIds });
  return gameTitles;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getGenresByGameTitleId,
  getGameTitlesByGenreIds,
};
