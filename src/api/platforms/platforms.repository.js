import PlatformModel from './platforms.model.js';

async function getById({ id }) {
  const platform = await PlatformModel.findById(id).lean();
  return platform;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
