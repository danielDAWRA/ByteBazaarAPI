import * as platformsService from './platforms.service.js';

async function getAll(req, res) {
  const platform = await platformsService.getAll();
  res.json(platform);
}

async function getById(req, res) {
  const { id } = req.params;
  const platform = await platformsService.getById({ id });
  res.json({ platform });
}

export {
  getById,
  getAll,
};
