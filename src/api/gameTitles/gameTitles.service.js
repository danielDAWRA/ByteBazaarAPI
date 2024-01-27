import * as gameTitlesRepository from './gameTitles.repository.js';
import * as productsService from '../products/products.service.js';
import * as genresRepository from '../genres/genres.repository.js';
import * as genresGameTitlesService from '../genres_gameTitles/genres_gameTitles.service.js';

async function getById({ id }) {
  const gameTitles = await gameTitlesRepository.getById({ id });
  return gameTitles;
}

async function getAll() {
  const gameTitles = await gameTitlesRepository.getAll();
  return gameTitles;
}

async function getByProductId(productId) {
  const product = await productsService.getById({ _id: productId });
  const gameTitles = await gameTitlesRepository.getByProductId({ gameTitleId: product._id });
  return gameTitles;
}

async function create(newTitleData) {
  const {
    title, description, image, genres,
  } = newTitleData;

  const created = {
    gameTitle: [],
    genres: [],
    genre_gameTitleRelation: [],
  };

  let titleUpsert;
  const foundGameTitle = await gameTitlesRepository.getByTitle(title);
  if (foundGameTitle) {
    titleUpsert = foundGameTitle;
  } else {
    titleUpsert = await gameTitlesRepository.create({ title, description, image });
    created.gameTitle.push(titleUpsert);
  }

  const foundGenres = await genresRepository.getByNames(genres);
  const newGenres = await genresRepository.upsertMany(genres);
  created.genres.push(...Object.values(newGenres.upsertedIds));
  const allGenres = [...foundGenres.map((g) => g._id), ...Object.values(newGenres.upsertedIds)];

  const relationsArray = allGenres.map((g) => ({
    gameTitle_id: titleUpsert._id,
    genre_id: g,
  }));
  const newRelations = await genresGameTitlesService
    .upsertMany(relationsArray);
  created.genre_gameTitleRelation.push(...Object.values(newRelations.upsertedIds));
  return { created };
}

export {
  getById,
  getAll,
  getByProductId,
  create,
};
