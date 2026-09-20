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
assert.equal(pages.size, 5, 'Homepage, three service pages and sample work');
const homepage = pages.get('index.html');
assert.ok(homepage.indexOf('id="services"') < homepage.indexOf('id="ai"'), 'Conventional services precede AI');
console.log(`PASS ${pages.size} pages, ${checkedLinks} local references; conventional services precede AI.`);
