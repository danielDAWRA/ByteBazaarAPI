import gameTitleModel from './gameTitles.model.js';

async function getById({ id }) {
  const gameTitle = await gameTitleModel.findById(id);
  // eslint-disable-next-line no-console
  console.log(gameTitle);
  return gameTitle;
}

async function getAllTitles() {
  const gameTitles = await gameTitleModel.find();
  return gameTitles;
}

export {
  getById,
  getAllTitles,
};
