import * as platformsRepository from './platforms.repository.js';

async function getById({ id }) {
  const platform = await platformsRepository.getById({ id });
  return platform;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
