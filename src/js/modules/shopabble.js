
import { requestProductData } from './utils';

export function generateShoppable(productList) {
  let products = requestProductData(productList, render);
  
  const render = () => {
    console.log("Rendering shoppable...", products);
    createShoppableElement(0, products);
  }
}

// Product set ID === image ID === style-map.json's keys
export function createShoppableElement(setId, productList, data) {
  let products = [...productList];

  let productListContainer = document.querySelector(`[data-set-id="${setId}"]`);
  if (productListContainer) {
    let loading = productListContainer.querySelector('.shop-overlay__loading');
    if (loading) productListContainer.removeChild(loading);
  } else {
    console.warn(`Product set container ${setId} can't be found.`)
    return;
  }
  
  // console.log(productListContainer);
  for (let product of products) {
    try {
      // Find product data in 'data'
      let p = data.find((item) => item.pid == product.pid && item.color == product.color);
      if (p) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('shop-overlay__product');
        const link = document.createElement('a')
        link.setAttribute('href', p.url);
        const img = document.createElement('img')
        img.setAttribute('src', p.image);
        const productName = document.createElement('div')
        productName.appendChild(document.createTextNode(p.name));

        wrapper.appendChild(link);
        link.appendChild(img);
        link.appendChild(productName);
        productListContainer.appendChild(wrapper);
      } else (`${product.pid}_${product.color} not found in returned data`);

    } catch (err) {
      console.error(product, err);
    }
  }
}

