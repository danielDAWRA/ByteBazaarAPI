import * as genresService from './genres.service.js';

async function getGenreById(req, res) {
  const { id } = req.params;
  const genre = await genresService.getGenreById(id);
  res.json(genre);
}

// eslint-disable-next-line import/prefer-default-export
export { getGenreById };
