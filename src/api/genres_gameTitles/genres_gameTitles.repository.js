/* eslint-disable camelcase */

/**
 * Disabled eslint camelCase warning so it's more clear that the model
 * represents a relations between two collections.
 * i.e. Genre_GameTitleModel is a relation between Genre and GameTitle
 */

import Genre_GameTitleModel from './genres_gameTitles.model.js';

async function getAllGenreTitleRelations() {
  const allGenreTitleRelations = await Genre_GameTitleModel.find();
  return allGenreTitleRelations;
}

async function createGameTitleGenreRelation(gameTitleId, genreId) {
  const newRelation = new Genre_GameTitleModel({
    gameTitle_id: gameTitleId,
    genre_id: genreId,
  });
  newRelation.save();
  return newRelation;
}

async function findByGenreAndTitle(genreId, titleId) {
  const foundGenreTitleRelation = await Genre_GameTitleModel
    .findOne({ genre_id: genreId, gameTitle_id: titleId });
  return foundGenreTitleRelation;
}

export {
  createGameTitleGenreRelation,
  getAllGenreTitleRelations,
  findByGenreAndTitle,
};
