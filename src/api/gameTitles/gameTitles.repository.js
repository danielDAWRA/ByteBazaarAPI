import gameTitleModel from './gameTitles.model.js';

async function getById({ id }) {
  const gameTitle = await gameTitleModel.findById(id).lean();
  return gameTitle;
}

async function getAllTitles() {
  const gameTitles = await gameTitleModel.find({});
  return gameTitles;
}

export {
  getById,
  getAllTitles,
};
