import genreModel from './genres.model.js';

async function getAll() {
  const genres = await genreModel.find({}).lean();
  return genres;
}

async function getById(id) {
  const genre = await genreModel.findById(id).lean();
  return genre;
}

async function getByNames(genresNames) {
  const genres = await genreModel.find({ name: { $in: genresNames } });
  return genres;
}

async function upsertMany(genres) {
  const genresBulk = genres.map((g) => ({
    updateOne: {
      filter: { name: g },
      update: { name: g },
      upsert: true,
    },
  }));
  const res = await genreModel.bulkWrite(genresBulk);
  return res;
}

export {
  getById,
  getAll,
  getByNames,
  upsertMany,
};
