import * as productsRepository from './products.repository.js';
import * as orderProductsService from '../orderProducts/orderProducts.service.js';
import * as ordersService from '../orders/orders.service.js';
import * as genresGameTitlesService from '../genres_gameTitles/genres_gameTitles.service.js';
import * as usersService from '../users/users.service.js';

async function getAll({ skip, limit }) {
  const products = await productsRepository.getAll({ skip, limit });
  return products;
}

async function getById({ id }) {
  const product = await productsRepository.getById({ id });
  return product;
}

async function getRecommended({ userId }) {
  const userOrders = await ordersService.getOrdersByUserId({ userId });
  if (!(userOrders && userOrders.length >= 1)) {
    // Return the most recent products if no orders have been placed yet
    const products = await productsRepository.getAll({ skip: 0, limit: 10 });
    return products;
  }
  // Obtain the last order
  const lastOrder = userOrders.slice(0, 1)[0];

  const { _id } = lastOrder;
  const orderProd = await orderProductsService
    .getProductGameTitleFromOrder({ orderId: _id });

  const platformId = orderProd.productId.platform_id;
  const gameTitleId = orderProd.productId.gameTitle_id;

  // The array of genre IDs for the GameTitleId is obtained
  const genres = await genresGameTitlesService.getGenresByGameTitleId({ gameTitleId });
  const genreIds = genres.map((item) => item.genre_id);

  // The GameTitleIds with those same genres are searched for
  const gameTitles = await genresGameTitlesService.getGameTitlesByGenreIds({ genreIds });
  const gameTitleIds = gameTitles.map((item) => item.gameTitle_id);

  const recommended = await productsRepository.getRecommended({ platformId, gameTitleIds });
  return recommended;
}

async function getRelated({ id }) {
  const product = await productsRepository.getById({ id });
  const gameTitleId = product.gameTitle_id;
  const genres = await genresGameTitlesService.getGenresByGameTitleId({ gameTitleId });
  const genreIds = genres.map((item) => item.genre_id);
  const gameTitles = await genresGameTitlesService.getGameTitlesByGenreIds({ genreIds });
  const gameTitleIds = gameTitles.map((item) => item.gameTitle_id);
  const recommended = await productsRepository.getRelated({ gameTitleIds, product });
  return recommended;
}

function getProductIds({ products }) {
  const productIdsArray = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const { productId } = product;
    productIdsArray.push(productId);
  }
  return productIdsArray;
}

function addDataToProducts({ products, pricesAndStock }) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    for (let j = 0; j < pricesAndStock.length; j++) {
      const priceAndStock = pricesAndStock[j];
      if (product.productId === priceAndStock._id.valueOf()) {
        product.price = priceAndStock.price;
        product.stock = priceAndStock.stock;
      }
    }
  }
  return products;
}

function isInsufficentStock({ products }) {
  const insufficientStock = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.quantity > product.stock) {
      insufficientStock.push(product.productId);
    }
  }
  return insufficientStock;
}

function getOrderTotal({ products }) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    total += product.price * product.quantity;
  }
  return total;
}

async function buy({ orderData, user }) {
  const { products } = orderData;
  const productIds = getProductIds({ products });
  const pricesAndStock = await productsRepository.getPricesAndStockById({ productIds });
  addDataToProducts({ products, pricesAndStock });
  const insufficientStock = isInsufficentStock({ products });
  if (insufficientStock.length) {
    const result = { error: insufficientStock };
    return result;
  }
  const total = getOrderTotal({ products });
  const { paymentMethod } = orderData;
  const updatedCredit = await usersService.updateCredit({ user, paymentMethod, total });
  if (typeof updatedCredit === 'string') {
    return updatedCredit;
  }
  await productsRepository.updateStock({ products });
  const userId = user._id;
  const orderId = await ordersService.log({ userId, total });
  await orderProductsService.log({ orderId, products });
  const result = {
    products,
    updatedCredit,
  };
  return result;
}

export {
  getAll,
  getById,
  getRecommended,
  getRelated,
  buy,
};
