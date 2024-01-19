import * as gameTitlesRepository from './gameTitles.repository.js';
import * as productsService from '../products/products.service.js';

async function getById({ id }) {
  const gameTitles = await gameTitlesRepository.getById({ id });
  return gameTitles;
}

// async function getByProductId({ productId }) {
//   const product = await productsService.getById({ _id: productId });
//   const gameTitleId = product.gameTitle_id;
//   const gameTitles = await gameTitlesRepository.getByProductId({ gameTitleId });
//   return gameTitles;
// }

async function getByProductId(productId) {
  try {
    const product = await productsService.getById({ _id: productId });
    console.log('product gameTitle.service:', product);
    console.log('product:', product);

    if (product && product.gameTitle_id) {
      const gameTitleId = product.gameTitle_id;
    } else {
      console.error('Product or gameTitle_id is null.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export {
  getById,
  getByProductId,
};
