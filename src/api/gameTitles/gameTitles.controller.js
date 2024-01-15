import * as gameTitlesService from './gameTitles.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const gameTitles = await gameTitlesService.getById({ id });
  res.json(gameTitles);
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getById,
};
