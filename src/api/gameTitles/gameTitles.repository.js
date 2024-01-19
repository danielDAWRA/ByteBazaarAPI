import gameTitleModel from './gameTitles.model.js';

async function getById({ id }) {
  const gameTitle = await gameTitleModel.findById(id).lean();
  return gameTitle;
}

async function getByProductId({ gameTitleId }) {
  const gameTitle = await gameTitleModel.findById(gameTitleId).lean();
  return gameTitle;
}

export {
  getById,
  getByProductId,
};
