import PlatformModel from './platforms.model.js';

async function getAll() {
  const platforms = await PlatformModel.find({}).lean();
  return platforms;
}

async function getById({ id }) {
  const platform = await PlatformModel.findById(id).lean();
  return platform;
}

export {
  getAll,
  getById,
};
