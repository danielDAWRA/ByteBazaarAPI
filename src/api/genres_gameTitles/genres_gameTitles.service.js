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

async function findManyByGenreAndTitle(relationsArray) {
  const relations = await genresGameTitlesRepository
    .findManyByGenreAndTitle(relationsArray);
  return relations;
}

async function upsertMany(relationsArray) {
  const res = await genresGameTitlesRepository
    .upsertMany(relationsArray);
  return res;
}

export {
  getGenresByGameTitleId,
  getGameTitlesByGenreIds,
  findManyByGenreAndTitle,
  upsertMany,
};
