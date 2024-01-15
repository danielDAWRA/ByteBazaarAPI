import platformModel from './platforms.model.js';

async function getById({ _id: id }) {
  const platform = await platformModel.find({ _id: id }).lean();
  return platform;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
