import * as gameTitlesRepository from './gameTitles.repository.js';
import * as productsService from '../products/products.service.js';

async function getById({ id }) {
  const gameTitles = await gameTitlesRepository.getById({ id });
  return gameTitles;
}

async function getByProductId(productId) {
  try {
    const product = await productsService.getById({ _id: productId });
    console.log('product gameTitle.service:', product);
    console.log('product:', product);

    let gameTitleId;

    if (product && product.gameTitle_id) {
      gameTitleId = product.gameTitle_id;
    } else {
      console.error('Product or gameTitle_id is null.');
      return null;
    }

    return gameTitleId;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export {
  getById,
  getByProductId,
};
