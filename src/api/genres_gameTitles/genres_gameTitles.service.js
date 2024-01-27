import * as genresGameTitlesRepository from './genres_gameTitles.repository.js';












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


  findManyByGenreAndTitle,
  upsertMany,
};
