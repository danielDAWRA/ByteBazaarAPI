import * as platformsRepository from './platforms.repository.js';

async function getById({ _id: id }) {
  const platform = await platformsRepository.getById({ _id: id });
  return platform;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
