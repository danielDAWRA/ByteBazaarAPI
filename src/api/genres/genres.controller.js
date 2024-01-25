import * as genresService from './genres.service.js';

async function getAll(req, res) {
  const genres = await genresService.getAll();
  res.json(genres);
}

async function getGenreById(req, res) {
  const { id } = req.params;
  const genre = await genresService.getGenreById(id);
  res.json(genre);
}

export {
  getGenreById,
  getAll,
};
