import GenresGameTitleModel from './genres_gameTitles.model.js';

async function getGenresByGameTitleId({ gameTitleId }) {
  const genres = await GenresGameTitleModel.find({ gameTitle_id: gameTitleId })
    .select({ genre_id: 1, _id: 0 });
  return genres;
}

async function getGameTitlesByGenreIds({ genreIds }) {
  const gameTitles = await GenresGameTitleModel.find({ genre_id: { $in: genreIds } });
  return gameTitles;
}

async function findManyByGenreAndTitle(relationsArray) {
  const relations = await GenresGameTitleModel.find({ $or: relationsArray });
  return relations;
}

async function upsertMany(relationsArray) {
  const relationsArrayBulk = relationsArray.map((r) => ({
    updateOne: {
      filter: { gameTitle_id: r.gameTitle_id, genre_id: r.genre_id },
      update: { gameTitle_id: r.gameTitle_id, genre_id: r.genre_id },
      upsert: true,
    },
  }));
  const res = await GenresGameTitleModel.bulkWrite(relationsArrayBulk);
  return res;
}

export {
  getGenresByGameTitleId,
  getGameTitlesByGenreIds,
  findManyByGenreAndTitle,
  upsertMany,
};
