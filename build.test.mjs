import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, cp, readFile, readdir, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createSiteServer} from './server.mjs';
import http from 'node:http';

test('local font files are served under the existing same-origin policy', async () => {
  const server = await createSiteServer({directory: new URL('./dist/', import.meta.url), port: 4180});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const response = await new Promise((resolve, reject) => {
      http.get({host: '127.0.0.1', port: server.address().port, path: '/assets/fonts/bricolage-grotesque-700.woff2', headers: {Host: 'localhost:4180'}}, res => {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve({status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks)}));
      }).on('error', reject);
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers['content-type'], 'font/woff2');
    assert.match(response.headers['content-security-policy'], /style-src 'self';/);
    assert.equal(response.body.subarray(0, 4).toString(), 'wOF2');
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('candidate and release keep distinct indexing rules and correct page URLs', async () => {
  const fixture = await mkdtemp(path.join(tmpdir(), 'itot-build-test-'));
  try {
    await cp(new URL('./dist/', import.meta.url), path.join(fixture, 'dist'), {recursive: true});
    await cp(new URL('./prepare-site.mjs', import.meta.url), path.join(fixture, 'prepare-site.mjs'));
    for (const mode of ['candidate', 'release']) {
      const args = ['prepare-site.mjs', ...(mode === 'release' ? ['--release'] : [])];
      execFileSync(process.execPath, args, {cwd: fixture});
      const output = path.join(fixture, mode);
      const files = (await readdir(output)).filter(name => name.endsWith('.html'));
      assert.equal(files.length, 7);
      assert.ok(files.includes('industrial-networks.html'), 'Industrial work has a standalone service route');
      for (const name of files) {
        const html = await readFile(path.join(output, name), 'utf8');
        const url = 'https://itotexpress.com/' + (name === 'index.html' ? '' : name);
        assert.ok(html.includes(`<link rel="canonical" href="${url}">`));
        assert.ok(html.includes(`<meta property="og:url" content="${url}">`));
        assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
        assert.ok(html.includes(`content="${mode === 'release' ? 'index, follow' : 'noindex, nofollow'}"`));
        assert.doesNotMatch(html, /fonts\.googleapis|fonts\.gstatic/);
      }
      const robots = await readFile(path.join(output, 'robots.txt'), 'utf8');
      assert.match(robots, mode === 'release' ? /Allow: \/\nSitemap:/ : /Disallow: \//);
      const sitemap = await readFile(path.join(output, 'sitemap.xml'), 'utf8');
      assert.ok(sitemap.includes('https://itotexpress.com/industrial-networks.html'), 'New service route appears in generated sitemap');
      assert.throws(() => execFileSync(process.execPath, args, {cwd: fixture, stdio: 'pipe'}), 'existing output must not be overwritten');
    }
  } finally {
    assert.equal(path.dirname(path.resolve(fixture)), path.resolve(tmpdir()));
    assert.ok(path.basename(fixture).startsWith('itot-build-test-'));
    await rm(fixture, {recursive: true, force: true});
  }
});
