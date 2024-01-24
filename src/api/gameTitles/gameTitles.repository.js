import GameTitleModel from './gameTitles.model.js';

async function getById({ id }) {
  const gameTitle = await GameTitleModel.findById(id).lean();
  return gameTitle;
}

async function getAllTitles() {
  const gameTitles = await GameTitleModel.find();
  return gameTitles;
}

async function getByProductId({ gameTitleId }) {
  const gameTitle = await GameTitleModel.findById(gameTitleId).lean();
  return gameTitle;
}

async function getByTitle(title) {
  const gameTitle = GameTitleModel.findOne({ title });
  return gameTitle;
}

async function createTitle(newTitleData) {
  const newTitle = new GameTitleModel(newTitleData);
  await newTitle.save();
  return newTitle;
}

export {
  getById,
  getAllTitles,
  getByProductId,
  getByTitle,
  createTitle,
};
