// Checks a release using an ephemeral loopback server, never the deployed site.
import assert from 'node:assert/strict';
import http from 'node:http';
import {readdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createSiteServer} from './server.mjs';

const root = new URL('./release/', import.meta.url);
const server = await createSiteServer({directory:root, published:true});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const request = (path, host='itotexpress.com') => new Promise((resolve,reject) => {
  http.get({host:'127.0.0.1',port:server.address().port,path,headers:{Host:host}},res => {
    const chunks=[];res.on('data',chunk=>chunks.push(chunk));
    res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks).toString()}));
  }).on('error',reject);
});
try {
  const pages=(await readdir(root)).filter(name=>name.endsWith('.html'));
  assert.equal(pages.length,6);
  const assets=new Set();
  for(const name of pages) {
    const path=name==='index.html'?'/':'/'+name;
    const result=await request(path);
    assert.equal(result.status,200,name);
    assert.match(result.body, /content="index, follow"/);
    assert.doesNotMatch(result.body,/noindex|Unpublished working draft|herman|goldstein|linkedin\.com/i);
    assert.ok(result.body.includes(`href="https://itotexpress.com${path}"`));
    assert.match(result.body,/Open contact form/);
    assert.match(result.body,/mailto:hello@itotexpress.com/);
    assert.equal(result.headers['x-robots-tag'],undefined);
    for(const match of result.body.matchAll(/(?:src|srcset|href)="([^"#]+)"/g)) {
      if(!/^(?:https?:|mailto:)/.test(match[1])) assets.add(match[1].split('#')[0]);
    }
  }
  const css = await readFile(new URL('site.css',root),'utf8');
  for (const match of css.matchAll(/url\(['"]?([^)'"]+)['"]?\)/g)) assets.add(match[1]);
  for(const path of assets) assert.equal((await request('/'+path)).status,path==='index.html'?308:200,path);
  assert.match((await request('/robots.txt')).body,/Allow: \//);
  assert.equal([...((await request('/sitemap.xml')).body.matchAll(/<loc>/g))].length,6);
  assert.equal((await request('/missing.html')).status,404);
  assert.equal((await request('/palzivalerts/hr')).status,410);
  assert.equal((await request('/','www.itotexpress.com')).status,308);
  const hashes={};
  async function hashFiles(directory,prefix='') {
    for(const entry of await readdir(directory,{withFileTypes:true})) {
      const relative=prefix+entry.name;
      if(entry.isDirectory()) await hashFiles(new URL(entry.name+'/',directory),relative+'/');
      else hashes[relative]=createHash('sha256').update(await readFile(new URL(entry.name,directory))).digest('hex');
    }
  }
  await hashFiles(root);
  const result={checkedAt:new Date().toISOString(),target:'ephemeral loopback release only',pages:pages.length,linkedResources:assets.size,checks:'passed',sha256:hashes};
  await writeFile(new URL('./RELEASE_CHECKS.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
  console.log(`PASS release: ${pages.length} pages, ${assets.size} linked resources, indexability, contact links, redirects, 404 and 410; ${Object.keys(hashes).length} file hashes recorded.`);
} finally {await new Promise(resolve=>server.close(resolve));}
