import genresGameTitleModel from './genres_gameTitles.model.js';

async function getGenresByGameTitleId({ gameTitleId }) {
  const genres = await genresGameTitleModel.find({ gameTitle_id: gameTitleId })
    .select({ genre_id: 1, _id: 0 });
  return genres;
}

async function getGameTitlesByGenreIds({ genreIds }) {
  const gameTitles = await genresGameTitleModel.find({ genre_id: { $in: genreIds } });
  return gameTitles;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getGenresByGameTitleId,
  getGameTitlesByGenreIds,
};
