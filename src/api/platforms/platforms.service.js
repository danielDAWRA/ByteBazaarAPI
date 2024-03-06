import * as platformsRepository from './platforms.repository.js';

async function getAll() {
  const platform = await platformsRepository.getAll();
  return platform;
}
async function getById({ id }) {
  const platform = await platformsRepository.getById({ id });
  return platform;
}

export {
  getAll,
  getById,
};
