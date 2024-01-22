/* eslint-disable camelcase */

/**
 * Disabled eslint camelcase rule so it's clear that
 * Genre_GameTitleModel represents a relation between two collections
 */

import genreModel from './genres.model.js';
import Genre_GameTitleModel from '../genres_gameTitles/genres_gameTitles.model.js';

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

async function getGenresByTitleId(id) {
  const genres = await Genre_GameTitleModel
    .find({ gameTitle_id: id })
    .populate('genre_id')
    .lean();
  const genresArray = genres.map((genre) => genre.genre_id.name);
  return genresArray;
}

export {
  getGenreById,
  getGenreByName,
  createGenre,
  getGenresByTitleId,
};
