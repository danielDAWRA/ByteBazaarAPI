import gameTitleModel from './gameTitles.model.js';

async function getById({ id }) {
  const user = await gameTitleModel.findById(id).lean();
  return user;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
