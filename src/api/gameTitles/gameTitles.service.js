/* eslint-disable camelcase */

/**
 * Disabled eslint camelCase rule so it's clear that genres_gameTitlesRepository
 * represents a relation between two models (a join table)
 */

import * as gameTitlesRepository from './gameTitles.repository.js';
import * as productsService from '../products/products.service.js';
import * as genresRepository from '../genres/genres.repository.js';
import * as genres_gameTitlesRepository from '../genres_gameTitles/genres_gameTitles.repository.js';

async function getById({ id }) {
  const gameTitles = await gameTitlesRepository.getById({ id });
  return gameTitles;
}

async function getAllTitles() {
  const gameTitles = await gameTitlesRepository.getAllTitles();
  return gameTitles;
}

async function getByProductId(productId) {
  const product = await productsService.getById({ _id: productId });
  const gameTitles = await gameTitlesRepository.getByProductId({ gameTitleId: product._id });
  return gameTitles;
}

/**
 * createTitle implementation:
 * - Insert into 'gameTitles' collection IF NOT EXISTS
 * - Insert into 'genres' collection IF NOT EXISTS (supports multiple genres)
 * - Insert into 'genres_gameTitles' collection IF NOT EXISTS (supports multiple relations)
 * - Returns object containing only newly created / stored data
 */

async function createTitle(newTitleData) {
  const {
    title, description, image, genres,
  } = newTitleData;

  const created = {
    gameTitle: [],
    genres: [],
    genre_gameTitleRelation: [],
  };

  // STEP 1: Insert into 'gameTitles' IF NOT EXISTS
  let titleUpsert;
  const foundGameTitle = await gameTitlesRepository.getByTitle(title);
  if (foundGameTitle) {
    titleUpsert = foundGameTitle;
  } else {
    titleUpsert = await gameTitlesRepository.createTitle({ title, description, image });
    created.gameTitle.push(titleUpsert);
  }

  // STEP 2: Insert into 'genres' IF NOT EXISTS
  const genresUpsertMapPromises = genres.map(async (genre) => {
    const foundGenre = await genresRepository.getGenreByName(genre);
    return { genre, found: !!foundGenre };
  });
  const genresUpsertMap = await Promise.all(genresUpsertMapPromises);
  const genresToCreate = genresUpsertMap
    .filter((genre) => !genre.found)
    .map((genre) => ({ name: genre.genre }));
  const newGenres = await genresRepository.createManyGenres(genresToCreate);
  // created.genres.push(...newGenres); // ! Throws Error, why?
  newGenres.forEach((newGenre) => created.genres.push(newGenre));

  // STEP 3: Insert into 'genres_gameTitles' IF NOT EXISTS
  //  - Retrieve genres again because we need all the id's
  const genrePromises = genres.map(async (genre) => {
    const foundGenre = await genresRepository.getGenreByName(genre);
    return foundGenre;
  });
  const genresToRelate = await Promise.all(genrePromises);
  //  - Define which relations need to be created
  const titleGenreRelationUpsertPromises = genresToRelate.map(async (genre) => {
    const foundTitleGenreRelation = await genres_gameTitlesRepository
      .findByGenreAndTitle(genre._id, titleUpsert._id);
    return {
      relation: { genre: genre._id, title: titleUpsert._id },
      found: !!foundTitleGenreRelation,
    };
  });
  const titleGenreRelationUpsertMap = await Promise.all(titleGenreRelationUpsertPromises);
  const titleGenreRelationsToCreate = titleGenreRelationUpsertMap
    .filter((titleGenreRelation) => titleGenreRelation.found === false)
    .map((titleGenreRelation) => ({
      gameTitle_id: titleGenreRelation.relation.title,
      genre_id: titleGenreRelation.relation.genre,
    }));

  // Create new relations!
  const newGenreAndTitleRelations = await genres_gameTitlesRepository
    .createManyGenreAndTitleRelations(titleGenreRelationsToCreate);
  created.genre_gameTitleRelation.push(...newGenreAndTitleRelations);

  return { created };
}

export {
  getById,
  getAllTitles,
  getByProductId,
  createTitle,
};
