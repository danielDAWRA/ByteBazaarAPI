import gameTitlesRepository from './gameTitles.repository.js';

async function getById({ id }) {
  const gameTitles = await gameTitlesRepository.getById({ id });
  return gameTitles;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
