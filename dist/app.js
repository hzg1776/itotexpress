const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const mobile = window.matchMedia('(max-width: 760px)');
menu.hidden = false;
document.documentElement.classList.add('js');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  menu.querySelector('span').textContent = open ? '−' : '+';
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
mobile.addEventListener('change', () => setMenu(false));

const interestNames = {
  consultation: 'A conversation about your technology',
  network: 'Network audit',
  documentation: 'Documentation cleanup or creation',
  ai: 'AI analysis'
};
let selectedInterest = document.body.dataset.serviceInterest || 'consultation';
function setInterest(value) {
  selectedInterest = Object.hasOwn(interestNames, value) ? value : 'consultation';
  const interest = document.querySelector('#contact-interest');
  interest.textContent = `Your starting point: ${interestNames[selectedInterest]}`;
  interest.hidden = selectedInterest === 'consultation';
}
setInterest(selectedInterest);
document.querySelectorAll('a[data-interest]').forEach(link => link.addEventListener('click', () => setInterest(link.dataset.interest)));
