// Checks a release using an ephemeral loopback server, never the deployed site.
import assert from 'node:assert/strict';
import http from 'node:http';
import {readdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createSiteServer} from './server.mjs';

const outputArgument=process.argv.find(value=>value.startsWith('--output='));
const outputName=outputArgument?.slice('--output='.length) || 'release';
if(!/^[a-z0-9-]+$/i.test(outputName)) throw Error('--output must be a single folder name containing only letters, numbers, and hyphens');
const root = new URL(`./${outputName}/`, import.meta.url);
const server = await createSiteServer({directory:root, published:true});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const request = (path, host='itotexpress.com') => new Promise((resolve,reject) => {
  http.get({host:'127.0.0.1',port:server.address().port,path,headers:{Host:host}},res => {
    const chunks=[];res.on('data',chunk=>chunks.push(chunk));
    res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks).toString()}));
  }).on('error',reject);
});
try {
  const pages=(await readdir(root)).filter(name=>name.endsWith('.html') && name!=='404.html');
  assert.deepEqual(pages.sort(), ['ai-analysis.html', 'index.html', 'industrial-networks.html', 'network-audits.html', 'samples.html', 'technical-documentation.html', 'website-development.html']);
  const assets=new Set();
  for(const name of pages) {
    const path=name==='index.html'?'/':'/'+name.replace(/\.html$/,'');
    const result=await request(path);
    assert.equal(result.status,200,name);
    assert.match(result.body, /content="index, follow"/);
    assert.doesNotMatch(result.body,/noindex|Unpublished working draft|herman|goldstein|linkedin\.com/i);
    assert.ok(result.body.includes(`href="https://itotexpress.com${path}"`));
    assert.match(result.body,/Open contact form/);
    assert.match(result.body,/mailto:hello@itotexpress.com/);
    assert.equal(result.headers['x-robots-tag'],undefined);
    const formUrl=result.body.match(/class="button form-open-button"[^>]*href="([^"]+)"/)?.[1];
    assert.ok(formUrl && new URL(formUrl).hostname==='forms.zohopublic.com',`${name}: Zoho form destination remains present`);
    for(const match of result.body.matchAll(/(?:src|srcset|href)="([^"#]+)"/g)) {
      if(!/^(?:https?:|mailto:)/.test(match[1])) assets.add(match[1].split('#')[0]);
    }
  }
  const css = await readFile(new URL('site.css',root),'utf8');
  for (const match of css.matchAll(/url\(['"]?([^)'"]+)['"]?\)/g)) assets.add(match[1]);
  for(const path of assets) assert.equal((await request(path.startsWith('/')?path:'/'+path)).status,200,path);
  assert.match((await request('/robots.txt')).body,/Allow: \//);
  assert.equal([...((await request('/sitemap.xml')).body.matchAll(/<loc>/g))].length,pages.length);
  assert.equal((await request('/missing.html')).status,404);
  assert.equal((await request('/palzivalerts/hr')).status,410);
  assert.equal((await request('/','www.itotexpress.com')).status,308);
  assert.equal((await request('/index.html?source=preview')).headers.location,'https://itotexpress.com/?source=preview');
  for(const name of pages.filter(name=>name!=='index.html')) {
    const canonical='/'+name.replace(/\.html$/,'');
    const redirect=await request('/'+name+'?source=preview');
    assert.equal(redirect.status,308,name);
    assert.equal(redirect.headers.location,`https://itotexpress.com${canonical}?source=preview`,name);
  }
  const headers=await readFile(new URL('_headers',root),'utf8');
  assert.match(headers,/X-Content-Type-Options: nosniff/);
  assert.match(headers,/Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers,/Permissions-Policy: camera=\(\), microphone=\(\), geolocation=\(\)/);
  assert.match(headers,/Content-Security-Policy: default-src 'self';/);
  const hashes={};
  async function hashFiles(directory,prefix='') {
    for(const entry of await readdir(directory,{withFileTypes:true})) {
      const relative=prefix+entry.name;
      if(entry.isDirectory()) await hashFiles(new URL(entry.name+'/',directory),relative+'/');
      else hashes[relative]=createHash('sha256').update(await readFile(new URL(entry.name,directory))).digest('hex');
    }
  }
  await hashFiles(root);
  hashes['functions/palzivalerts/[[path]].ts']=createHash('sha256').update(await readFile(new URL('./functions/palzivalerts/[[path]].ts',import.meta.url))).digest('hex');
  const result={checkedAt:new Date().toISOString(),target:'ephemeral loopback release only',pages:pages.length,linkedResources:assets.size,checks:'passed',sha256:hashes};
  await writeFile(new URL('./RELEASE_CHECKS.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
  console.log(`PASS release: ${pages.length} pages, ${assets.size} linked resources, indexability, contact links, redirects, 404 and 410; ${Object.keys(hashes).length} file hashes recorded.`);
} finally {await new Promise(resolve=>server.close(resolve));}
