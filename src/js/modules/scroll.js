import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

export function attach(selector) {
  window.addEventListener('load', ()=>{
    let targets = document.querySelectorAll(selector);
    for (let i = 0; i < targets.length; i++) {
      targets[i].addEventListener('click', (e)=>{
        e.preventDefault();
        let el = document.getElementById(targets[i].href.split('#')[1]);
        // el.scrollIntoView({behavior: 'smooth'});
        window.scroll({
          top: (el.offsetTop - 125),
          behavior: 'smooth'
        });
      });
    }
  });
}
