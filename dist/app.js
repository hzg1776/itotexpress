const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const mobile = window.matchMedia('(max-width: 960px)');
document.documentElement.classList.add('js');
if (menu && nav) {
  menu.hidden = false;
  function setMenu(open) {
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    menu.querySelector('img').src = open ? 'assets/icons/x.svg' : 'assets/icons/menu-2.svg';
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.querySelector('.mobile-contact')?.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); }
  });
  mobile.addEventListener('change', () => setMenu(false));
  if (document.body.classList.contains('sample-page')) {
    nav.querySelector('[data-page="examples"]')?.setAttribute('aria-current', 'page');
  } else if (document.body.dataset.serviceInterest === 'ai') {
    nav.querySelector('[data-page="ai"]')?.setAttribute('aria-current', 'page');
  }
}

