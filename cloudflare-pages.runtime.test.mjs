import test from 'node:test';
import assert from 'node:assert/strict';

const base=new URL(process.env.PAGES_PREVIEW_URL || 'http://127.0.0.1:8788');
const pages=['/','/network-audits','/industrial-networks','/technical-documentation','/website-development','/ai-analysis','/samples'];
const expectedCsp="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' https://static.cloudflareinsights.com; connect-src 'self'; form-action 'none'; base-uri 'none'; frame-ancestors 'none'";

async function request(path,options={}) {
  return fetch(new URL(path,base),{redirect:'manual',...options});
}

function assertSecurityHeaders(response) {
  assert.equal(response.headers.get('x-content-type-options'),'nosniff');
  assert.equal(response.headers.get('referrer-policy'),'strict-origin-when-cross-origin');
  assert.equal(response.headers.get('permissions-policy'),'camera=(), microphone=(), geolocation=()');
  assert.equal(response.headers.get('content-security-policy'),expectedCsp);
}

test('Pages runtime serves all seven canonical pages and keeps the existing security headers',async()=>{
  for(const path of pages) {
    const response=await request(path);
    assert.equal(response.status,200,path);
    assertSecurityHeaders(response);
    const html=await response.text();
    assert.match(html,new RegExp(`<link rel="canonical" href="https://itotexpress\\.com${path==='/'?'/':path}">`));
    assert.match(html,/mailto:hello@itotexpress\.com/);
    const form=html.match(/class="button form-open-button"[^>]*href="([^"]+)"/)?.[1];
    assert.equal(new URL(form).hostname,'forms.zohopublic.com');
  }
  const robots=await request('/robots.txt');
  assert.equal(robots.status,200);
  assert.match(await robots.text(),/Allow: \//);
  const sitemap=await request('/sitemap.xml');
  assert.equal((await sitemap.text()).match(/<loc>/g)?.length,7);
});

test('Pages runtime applies permanent legacy redirects and preserves query strings',async()=>{
  const index=await request('/index.html?source=preview');
  assert.equal(index.status,308);
  assert.equal(new URL(index.headers.get('location'),base).pathname,'/');
  assert.equal(new URL(index.headers.get('location'),base).search,'?source=preview');
  for(const path of pages.slice(1)) {
    const response=await request(`${path}.html?source=preview`);
    assert.equal(response.status,308,path);
    const target=new URL(response.headers.get('location'),base);
    assert.equal(target.pathname,path);
    assert.equal(target.search,'?source=preview');
  }
});

test('Pages runtime retires the old route without applying Function logic to static URLs',async()=>{
  for(const path of ['/palzivalerts','/palzivalerts/employee','/palzivalerts/hr']) {
    const response=await request(path);
    assert.equal(response.status,410,path);
    assertSecurityHeaders(response);
    assert.match(await response.text(),/This project has been retired/);
  }
  const head=await request('/palzivalerts/hr',{method:'HEAD'});
  assert.equal(head.status,410);
  assert.equal(await head.text(),'');
  const post=await request('/palzivalerts/hr',{method:'POST'});
  assert.equal(post.status,405);
  assert.equal(post.headers.get('allow'),'GET, HEAD');
  assertSecurityHeaders(post);
  const missing=await request('/missing.html');
  assert.equal(missing.status,404);
  assertSecurityHeaders(missing);
  assert.match(await missing.text(),/That page could not be found/);
});

test('Pages preview deployments stay noindex',async()=>{
  if(!base.hostname.endsWith('.pages.dev')) return;
  for(const path of ['/', '/palzivalerts/hr']) {
    const response=await request(path);
    assert.equal(response.headers.get('x-robots-tag'),'noindex, nofollow',path);
  }
});
