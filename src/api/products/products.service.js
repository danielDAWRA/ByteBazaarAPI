import * as productsRepository from './products.repository.js';
import * as orderProductsRepository from '../orderProducts/orderProducts.repository.js';
import * as ordersService from '../orders/orders.service.js';
import * as genresGameTitlesRepository from '../genres_gameTitles/genres_gameTitles.service.js';

async function getAll() {
  const products = await productsRepository.getAll();
  return products;
}

async function getById({ id }) {
  const product = await productsRepository.getById({ id });
  return product;
}

async function getRecommended({ userId }) {
  const userOrders = await ordersService.getOrdersByUserId({ userId });
  if (!(userOrders && userOrders.length >= 1)) {
    // Retornamos los producto más recientes si no hay pedidos todavía
    const products = await productsRepository.getAll();
    return products;
  }
  // Obtener la ultima orden
  const lastOrder = userOrders.slice(0, 1)[0];

  const { _id } = lastOrder;
  const orderProd = await orderProductsRepository
    .getProductGameTitleFromOrder({ orderId: _id });

  const platformId = orderProd.productId.platform_id;
  const gameTitleId = orderProd.productId.gameTitle_id;

  // Se obtiene el array de id de los géneros del GametTitleId
  const genres = await genresGameTitlesRepository.getGenresByGameTitleId({ gameTitleId });
  const genreIds = genres.map((item) => item.genre_id);

  // Se buscan los gametTitleIds con esos mismos géneros
  const gameTitles = await genresGameTitlesRepository.getGameTitlesByGenreIds({ genreIds });
  const gameTitleIds = gameTitles.map((item) => item.gameTitle_id);

  const recommended = await productsRepository.getRecommended({ platformId, gameTitleIds });
  return recommended;
}

export {
  getAll,
  getById,
  getRecommended,
};
