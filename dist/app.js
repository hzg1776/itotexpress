const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const mobile = window.matchMedia('(max-width: 760px)');
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
  const current = document.body.classList.contains('service-page') ? 'services' : document.body.classList.contains('sample-page') ? 'examples' : 'home';
  nav.querySelector('[data-page="' + current + '"]')?.setAttribute('aria-current', 'page');
}
