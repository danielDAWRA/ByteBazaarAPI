import gameTitleModel from './gameTitles.model.js';

async function getById({ id }) {
  const gameTitle = await gameTitleModel.findById(id).lean();
  return gameTitle;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
