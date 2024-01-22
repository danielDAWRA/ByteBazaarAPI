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

async function getByProductId(req, res) {
  const productId = req.params.id;
  const gameTitles = await gameTitlesService.getByProductId(productId);
  res.json(gameTitles);
}

async function createTitle(req, res) {
  const newTitleAndGenreRelation = await gameTitlesService.createTitle(req.body);
  res.json(newTitleAndGenreRelation);
}

export {
  getById,
  getAllTitles,
  getByProductId,
  createTitle,
};
