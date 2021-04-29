// Source: https://stackoverflow.com/a/34474701

function animateOnScroll(element) {
  let offset = 30;
  let top = window.pageYOffset + window.innerHeight;
  let isVisible = top > element.offsetTop + offset;
  if (isVisible) element.classList.add('animate-in');
}

export function attach() {
  let animateElements = [...document.querySelectorAll('.animate-on-scroll')];
  window.addEventListener('scroll', ()=>{
    animateElements.forEach((el)=>{
      animateOnScroll(el);
    });
  });
}