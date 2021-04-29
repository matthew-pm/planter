import { requestProductData } from './modules/utils';
import { createShoppableElement, initializeShoppableListeners } from './modules/shopabble';
import * as animateOnScroll from './modules/animateOnScroll';

// EXAMPLE
// Local product info
import productMap from '../data/products-sets.json';
import products from '../data/products.json';

// Get the remote data with our local product info map
requestProductData(products, done);

// Callback for once all remote product data is requested and received
function done(data, index) {
  if (index === products.length - 1) {
    render(data);
  }
}

// Render all shoppable overlay child elements
function render(data) {
  console.log(`got ${data.length} products`);
  for (let set in productMap) {
    createShoppableElement(set, productMap[set], data);
  }
}

// Get product data and populate shop overlays
let productSets = document.querySelectorAll('[data-productSet]');
for (let set of productSets) {
  let set_id = set.dataset.productSet;
  let productList = productMap[`${set_id}`];
  generateShoppable(productList);
}

// Set up listeners for the shoppable overlay triggers
initializeShoppableListeners();

// Set up listeners for the scroll animations
animateOnScroll.attach();