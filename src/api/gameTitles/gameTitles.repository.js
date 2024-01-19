import gameTitleModel from './gameTitles.model.js';

async function getById({ id }) {
  console.log('id from gameTItlesRepository:', id);
  const gameTitle = await gameTitleModel.findById(id).lean();
  console.log('gameTitle repository', gameTitle);
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
