import GenreModel from './genres.model.js';

async function getAll() {
  const genres = await GenreModel.find({}).lean();
  return genres;
}

async function getById(id) {
  const genre = await GenreModel.findById(id).lean();
  return genre;
}

async function getByNames(genresNames) {
  const genres = await GenreModel.find({ name: { $in: genresNames } });
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
  const res = await GenreModel.bulkWrite(genresBulk);
  return res;
}

export {
  getById,
  getAll,
  getByNames,
  upsertMany,
};
