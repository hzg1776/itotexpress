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


// Only public service labels go into the form URL; customer details stay in Zoho.
const serviceChoice = document.querySelector('#contact-service');
const inquiryLink = document.querySelector('.form-open-button');
if (serviceChoice && inquiryLink) {
  const formUrl = new URL(inquiryLink.href);
  formUrl.searchParams.delete('inquiry');
  function updateInquiry(interest) {
    const option = Array.from(serviceChoice.options).find(item => item.value === interest);
    if (!option) return;
    serviceChoice.value = interest;
    const nextUrl = new URL(formUrl);
    if (interest) nextUrl.searchParams.set('inquiry', `I would like help with ${option.textContent}.\n\n`);
    inquiryLink.href = nextUrl.href;
  }
  document.querySelector('.js-service-choice').hidden = false;
  updateInquiry(document.body.dataset.serviceInterest || '');
  serviceChoice.addEventListener('change', () => updateInquiry(serviceChoice.value));
  document.querySelectorAll('a[data-interest]').forEach(link => {
    link.addEventListener('click', () => updateInquiry(link.dataset.interest));
  });
}

// Preserve older deep links into a now-collapsed explanation.
function revealLinkedDetail() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  let detail = target.closest('details');
  if (!detail) return;
  while (detail) { detail.open = true; detail = detail.parentElement?.closest('details'); }
  target.scrollIntoView();
}
window.addEventListener('hashchange', revealLinkedDetail);
revealLinkedDetail();
