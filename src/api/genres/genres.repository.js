import genreModel from './genres.model.js';

async function getAll() {
  const genres = await genreModel.find({}).lean();
  return genres;
}

async function getById(id) {
  const genre = await genreModel.findById(id).lean();
  return genre;
}

async function getByName(genreName) {
  const genre = await genreModel.findOne({ name: genreName });
  return genre;
}

async function getByNames(genresNames) {
  const genres = await genreModel.find({ name: { $in: genresNames } });
  return genres;
}

async function create(genre) {
  // eslint-disable-next-line new-cap
  const newGenre = new genreModel({ genre });
  await newGenre.save();
  return newGenre;
}

async function createMany(genres) {
  const newGenres = await genreModel.insertMany(genres);
  return newGenres;
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
  getByName,
  getByNames,
  create,
  createMany,
  upsertMany,
};
