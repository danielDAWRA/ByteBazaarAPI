import gameTitleModel from './gameTitles.model.js';

async function getById({ id }) {
  const gameTitle = await gameTitleModel.findById(id);
  return gameTitle;
}

async function getAllTitles() {
  const gameTitles = await gameTitleModel.find();
  return gameTitles;
}

async function getByProductId({ gameTitleId }) {
  const gameTitle = await gameTitleModel.findById(gameTitleId).lean();
  return gameTitle;
}

export {
  getById,
  getAllTitles,
  getByProductId,
};
