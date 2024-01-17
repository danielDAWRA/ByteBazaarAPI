import * as gameTitlesRepository from './gameTitles.repository.js';

async function getById({ id }) {
  const gameTitles = await gameTitlesRepository.getById({ id });
  return gameTitles;
}

async function getAllTitles() {
  const gameTitles = await gameTitlesRepository.getAllTitles();
  return gameTitles;
}

export {
  getById,
  getAllTitles,
};
