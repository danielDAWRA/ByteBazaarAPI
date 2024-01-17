import * as gameTitlesService from './gameTitles.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const gameTitles = await gameTitlesService.getById({ id });
  res.json(gameTitles);
}

async function getAllTitles(req, res) {
  const gameTitles = await gameTitlesService.getAllTitles();
  res.json(gameTitles);
}

export {
  getById,
  getAllTitles,
};
