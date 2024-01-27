/* eslint-disable camelcase */
import Genre_GameTitleModel from './genres_gameTitles.model.js';

async function getAll() {
  const allGenreTitleRelations = await Genre_GameTitleModel.find();
  return allGenreTitleRelations;
}

async function create(gameTitleId, genreId) {
  const newRelation = new Genre_GameTitleModel({
    gameTitle_id: gameTitleId,
    genre_id: genreId,
  });
  newRelation.save();
  return newRelation;
}

async function findManyByGenreAndTitle(relationsArray) {
  const relations = await Genre_GameTitleModel.find({ $or: relationsArray });
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
  const res = await Genre_GameTitleModel.bulkWrite(relationsArrayBulk);
  return res;
}

export {
  create,
  getAll,
  findManyByGenreAndTitle,
  upsertMany,
};
