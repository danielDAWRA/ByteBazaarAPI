import * as platformsService from './platforms.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const platform = await platformsService.getById({ _id: id });
  res.json({ platform });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
