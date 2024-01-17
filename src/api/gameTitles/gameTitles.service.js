import * as gameTitlesRepository from './gameTitles.repository.js';
import * as productsService from '../products/products.service.js';

async function getById({ id }) {
  const gameTitles = await gameTitlesRepository.getById({ id });
  return gameTitles;
}

async function getByProductId({ productId }) {
  const product = await productsService.getById({ _id: productId });
  const gameTitleId = product.gameTitle_id;
  const gameTitles = await gameTitlesRepository.getByProductId({ gameTitleId });
  return gameTitles;
}

export {
  getById,
  getByProductId,
};
