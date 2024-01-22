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

async function createTitle(newTitleData) {
  const {
    title, description, image, genre,
  } = newTitleData;

  const created = {
    gameTitle: false,
    genre: false,
    genre_gameTitleRelation: false,
  };

  // Check if the 'title' already exists. Create new one only if not exists.
  let titleUpsert;
  const foundGameTitle = await gameTitlesRepository.getByTitle(title);
  if (foundGameTitle) {
    titleUpsert = foundGameTitle;
  } else {
    titleUpsert = await gameTitlesRepository.createTitle({ title, description, image });
    created.gameTitle = true;
  }

  // Check if 'genre' already exists. If not, create a new one.
  let genreIdUpsert;
  const foundGenre = await genresRepository.getGenreByName(genre);
  if (foundGenre) {
    genreIdUpsert = foundGenre._id;
  } else {
    const newGenre = await genresRepository.createGenre(genre);
    genreIdUpsert = newGenre._id;
    created.genre = true;
  }

  // Check if Genre - Title relation already exists. If not, create it!
  let titleGenreRelationUpsert;
  const foundTitleGenreRelation = await genres_gameTitlesRepository
    .findByGenreAndTitle(genreIdUpsert, titleUpsert._id);
  if (foundTitleGenreRelation) {
    titleGenreRelationUpsert = foundTitleGenreRelation;
  } else {
    const newTitleGenreRelation = await genres_gameTitlesRepository
      .createGameTitleGenreRelation(titleUpsert._id, genreIdUpsert);
    titleGenreRelationUpsert = newTitleGenreRelation;
    created.genre_gameTitleRelation = true;
  }

  return { titleUpsert, titleGenreRelationUpsert, created };
}

export {
  getById,
  getAllTitles,
  getByProductId,
  createTitle,
};
