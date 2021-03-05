/*import { handleOverlayShow, requestProductData } from './modules/utils';
import { createShoppableElement } from './modules/shopabble';
// import { animateOnScroll } from './modules/animate';
import productMap from '../data/product-sets.json';
import products from '../data/products.json';

requestProductData(products, done);

function done(data, index) {
  if (index === products.length - 1) {
    render(data);
  }
}

// render();
function render(data) {
  console.log(`got ${data.length} products`);
  let sets = Object.keys(productMap);
  // console.log(sets);
  for (let set in productMap) {
    // console.log(set, productMap[set]);
    createShoppableElement(set, productMap[set], data);
    // try {
      
    // } catch (err) {
    //   console.error(`Couldn't create shoppable overlay for set: ${set}:`, productMap[set], `\nError:`, err);
    // }
  }
}



// Get product data and populate shop overlays
let productSets = document.querySelectorAll('[data-productSet]');
for (let set of productSets) {
  let set_id = set.dataset.productSet;
  let productList = productMap[`${set_id}`];
  generateShoppable(productList);
}


// Manage Shop Overlay Open/Close
document.addEventListener('DOMContentLoaded', function() {
  let shopOverlays = [...document.querySelectorAll('.shop-overlay')];
  let mobileOverlayToggles = [...document.querySelectorAll('.shop-overlay__btn--mobile')];
  // console.log('Shop overlays:', shopOverlays);
  // console.log(mobileOverlayToggles);
  shopOverlays.forEach((overlay, i)=>{
    // Let clicking anywhere inside the overlay except
    // the inner content close the overlay
    overlay.querySelector('.shop-overlay__inner').addEventListener('click', (e)=>{
      e.stopPropagation()
    });
    
    // Toggle show on control button clicks
    overlay.querySelector('.shop-overlay__btn').addEventListener('click', (e)=>{
      handleOverlayShow(overlay, shopOverlays);
      e.stopPropagation();
    });
    overlay.querySelector('.shop-overlay__close').addEventListener('click', (e)=>{
      handleOverlayShow(overlay);
      e.stopPropagation();
    });

    // For each overlay, also assign its respective mobile toggle
    mobileOverlayToggles[i].addEventListener('click', (e)=>{
      handleOverlayShow(overlay);
      e.stopPropagation();
    });
  });

  // Enable clicking the page background to close the overlay
  // NOTE: getting this by ID makes it so it'll only work for this specific
  //       page which has all of it's page content wrapped in an ID'd div
  document.getElementById('collection').addEventListener('click', (e)=>{
    shopOverlays.forEach((overlay)=>{
      if (overlay.classList.contains('show')) {
        overlay.classList.toggle('show');
      }
    });
  });

  // let animateElements = [...document.querySelectorAll('.animate-on-scroll')];
  // window.addEventListener('scroll', ()=>{
  //   animateElements.forEach((el)=>{
  //     animateOnScroll(el);
  //   });
  // });
});

*/