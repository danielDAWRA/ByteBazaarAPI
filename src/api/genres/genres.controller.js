import * as genresService from './genres.service.js';

async function getAll(req, res) {
  const genres = await genresService.getAll();
  res.json(genres);
}

async function getById(req, res) {
  const { id } = req.params;
  const genre = await genresService.getById(id);
  res.json(genre);
}

export {
  getById,
  getAll,
};
