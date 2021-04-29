
import { requestProductData } from './utils';

/**
 * Generate Shoppable Content
 * =====================================================================================
 */

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

/**
 * Initialize Shoppable Listeners
 * =====================================================================================
 */

export function initializeShoppableListeners() {
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
    document.body.addEventListener('click', (e)=>{
      shopOverlays.forEach((overlay)=>{
        if (overlay.classList.contains('show')) {
          overlay.classList.toggle('show');
        }
      });
    });
  });
}

/**
 * Overlay Toggle Helper
 * =====================================================================================
 */

// Handler for opening and closing overlays
// overlay – the overlay to be toggled
// all (optional) – NodeList of all the overlays
function handleOverlayShow(overlay, all) {
  overlay.classList.toggle('show');
  toggleHelpButton();
  if (all) {
    all.forEach((o)=>{
      if (o !== overlay && o.classList.contains('show')) {
        o.classList.toggle('show');
      }
    })
  }
}

// Toggle visibility of Zendesk help button when our overlay opens and closes
function toggleHelpButton() {
  let help = document.getElementById('launcher');
  // console.log(help);
  if (help && window.innerWidth <= 991.98) {
    if (help.style.visibility == 'hidden') {
      help.style.opacity = '1';
      help.style.visibility = 'visible';
    } 
    else if (help.style.visibility == 'visible') {
      help.style.opacity = '0';
      window.setTimeout(()=>{
        help.style.visibility = 'hidden';
      }, 500);
    }
    else {
      help.style.opacity = '0';
      window.setTimeout(()=>{
        help.style.visibility = 'hidden';
      }, 500);
    }
  }
}

