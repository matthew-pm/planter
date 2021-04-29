
/**
 * Request Product Data
 * =====================================================================================
 */
export function requestProductData(productList, callback) {

  let data = [];
  console.log(`requesting data for ${productList.length} products`);

  let index = 0;
  for (let product of productList) {
    const http = new XMLHttpRequest();
    const url = `${window.location.origin}/on/demandware.store/Sites-PM-Site/en_US/Product-ShowQuickView?pid=${product.pid}&dwvar_${product.pid}_color=${product.color}`;
    http.overrideMimeType('application/json');
    http.open('GET', url);
    http.send();
    http.addEventListener('load', ()=>{
      handleResponse(product, data, http.responseText);
      callback(data, index);
      index++;
    });
  }

  return data;
}

function handleResponse(product, data, responseText) {
  try {
    let json = JSON.parse(responseText);
    data.push({
      pid: product.pid,
      color: product.color,
      name: json.product.productName,
      url: parseSelectedProductUrl(json.product.selectedProductUrl),
      image: json.product.images.medium[0].url,
    });
  }
  catch (error) {
    console.error(
      `Shoppable: Product Data could not be loaded for ${product.pid}_${product.color}.\n`,
      `\nError: ${error}`
    );
  }
}

function parseSelectedProductUrl(url) {
  return url.replace('&quantity=undefined', '');
  // return url.split('?')[0];
}

/**
 * Overlay Toggle Helper
 * =====================================================================================
 */

// Handler for opening and closing overlays
// overlay – the overlay to be toggled
// all (optional) – NodeList of all the overlays
export function handleOverlayShow(overlay, all) {
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

function toggleHelpButton() {
  let help = document.getElementById('launcher');
  // console.log(help);
  if (help && window.innerWidth <= 991.98) {
    if (help.style.visibility == 'hidden') {
      help.style.opacity = '1';
      help.style.visibility = 'visible';
      // console.log("h -> v");
    } 
    else if (help.style.visibility == 'visible') {
      help.style.opacity = '0';
      window.setTimeout(()=>{
        help.style.visibility = 'hidden';
      }, 500);
      // console.log("v -> h");
    }
    else {
      help.style.opacity = '0';
      window.setTimeout(()=>{
        help.style.visibility = 'hidden';
      }, 500);
      // console.log("v");
    }
  }
  // console.log('fired');
}

