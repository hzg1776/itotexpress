// Focused checks for static pages, metadata, structured data and local links.
import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';

const root = new URL('./dist/', import.meta.url);
const names = (await readdir(root)).filter(name => name.endsWith('.html'));
const pages = new Map(await Promise.all(names.map(async name => [name, await readFile(new URL(name, root), 'utf8')])));
const titles = new Set();
const descriptions = new Set();
let checkedLinks = 0;
for (const [name, html] of pages) {
  assert.ok(!/herman|goldstein|linkedin\.com/i.test(html), `${name}: no personal identity or LinkedIn links`);
  assert.doesNotMatch(html, /<iframe\b/, `${name}: contact must not reserve an empty embedded-form panel`);
  assert.equal([...html.matchAll(/class="button form-open-button"/g)].length, 1, `${name}: one primary contact-form link`);
  const formLink = html.match(/<a\b[^>]*class="button form-open-button"[^>]*>([\s\S]*?)<\/a>/);
  assert.ok(formLink?.[0].includes('href="https://forms.zohopublic.com/helloitote1/form/ITOTExpressWebsiteInquiry/formperma/Ty7JGh3gF7uQJMt4jV_itqt_8XqnVgDB7UvajWG2b-s"'), `${name}: approved contact form destination`);
  assert.match(formLink[1].replace(/<[^>]+>/g, ''), /contact form/i, `${name}: descriptive contact link`);
  assert.doesNotMatch(html, /<link[^>]+href="https?:[^>]+rel="stylesheet"|<link[^>]+rel="stylesheet"[^>]+href="https?:/i, `${name}: styles are served locally`);
  assert.match(html, /href="mailto:hello@itotexpress.com"/, `${name}: email alternative remains available`);
  assert.doesNotMatch(html, /data-contact-mode="preview"|messages are not sent yet/, `${name}: no mock submission form`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${name}: exactly one main heading`);
  assert.match(html, /<html lang="en">/, `${name}: document language`);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/, `${name}: draft must stay noindex`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), `${name}: unique title`);
  assert.ok(description && !descriptions.has(description), `${name}: unique description`);
  titles.add(title); descriptions.add(description);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${name}: unique IDs`);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || 'null');
  const siteNameMarkup = html.match(/<script type="application\/ld\+json" id="site-name-schema">([\s\S]*?)<\/script>/)?.[1];
  if (name === 'index.html') {
    const website = JSON.parse(siteNameMarkup || 'null');
    assert.equal(website?.['@type'], 'WebSite', 'Homepage identifies the website for site-name eligibility');
    assert.equal(website.name, 'IT/OT Express LLC');
    assert.equal(website.url, 'https://itotexpress.com/');
    assert.equal(schema.logo, 'https://itotexpress.com/assets/logo.png');
  } else assert.equal(siteNameMarkup, undefined, `${name}: homepage site-name markup is not copied to service pages`);
  assert.ok(schema && ['Organization', 'Service', 'WebPage'].includes(schema['@type']), `${name}: structured data type`);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'] === 'Service' ? schema.provider.name : schema['@type'] === 'WebPage' ? schema.publisher.name : schema.name, 'IT/OT Express LLC');
  assert.ok(!/"(?:aggregateRating|review|price|telephone|email|streetAddress)"/.test(JSON.stringify(schema)), `${name}: no unapproved proof or contact fields`);
  for (const [, reference] of html.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
    if (/^(https?:|data:|mailto:|tel:)/.test(reference)) continue;
    const url = new URL(reference, `http://draft.local/${name}`);
    const file = url.pathname.slice(1) || 'index.html';
    assert.ok((await stat(new URL(file, root))).isFile(), `${name}: ${reference} exists`);
    if (url.hash) {
      const target = pages.get(file);
      assert.ok(target?.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${name}: ${reference} target exists`);
    }
    checkedLinks++;
  }
  console.log(`PASS ${name}: heading, draft directive, metadata, JSON-LD and links`);
}
assert.equal(pages.size, 7, 'Homepage, five service pages and professional experience');
const homepage = pages.get('index.html');
assert.ok(homepage.indexOf('id="services"') < homepage.indexOf('id="ai"'), 'Conventional services precede AI');
const css = await readFile(new URL('site.css', root), 'utf8');
for (const [, reference] of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
  if (reference.startsWith('#')) continue;
  assert.doesNotMatch(reference, /^(?:https?:|\/\/)/, 'CSS assets stay local');
  assert.ok((await stat(new URL(reference, root))).isFile(), `CSS asset exists: ${reference}`);
}
console.log(`PASS ${pages.size} pages, ${checkedLinks} local references; conventional services precede AI.`);
