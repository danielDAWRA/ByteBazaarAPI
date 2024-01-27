import genresGameTitleModel from './genres_gameTitles.model.js';












async function findManyByGenreAndTitle(relationsArray) {
  const relations = await genresGameTitleModel.find({ $or: relationsArray });
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
  const res = await genresGameTitleModel.bulkWrite(relationsArrayBulk);
  return res;
}

export {


  findManyByGenreAndTitle,
  upsertMany,
};
