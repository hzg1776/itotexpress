import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {createSiteServer} from './server.mjs';
import {gunzipSync} from 'node:zlib';

test('text compression preserves content, HEAD length and explicit gzip opt-out', async () => {
  const server = await createSiteServer({directory: new URL('./dist/', import.meta.url), port: 4180});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const request = (encoding, method = 'GET') => new Promise((resolve, reject) => {
    const req = http.request({host: '127.0.0.1', port: server.address().port, path: '/site.css', method, headers: {Host: 'localhost:4180', 'Accept-Encoding': encoding}}, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({headers: res.headers, body: Buffer.concat(chunks), status: res.statusCode}));
    });
    req.on('error', reject); req.end();
  });
  try {
    const plain = await request('identity');
    const compressed = await request('gzip');
    assert.equal(compressed.status, 200);
    assert.equal(compressed.headers['content-encoding'], 'gzip');
    assert.equal(compressed.headers.vary, 'Accept-Encoding');
    assert.deepEqual(gunzipSync(compressed.body), plain.body);
    assert.ok(compressed.body.length < plain.body.length / 2);
    const head = await request('gzip', 'HEAD');
    assert.equal(head.body.length, 0);
    assert.equal(head.headers['content-length'], compressed.headers['content-length']);
    const declined = await request('gzip;q=0, identity');
    assert.equal(declined.headers['content-encoding'], undefined);
    assert.deepEqual(declined.body, plain.body);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('published host handling with a noindex test candidate: files, redirects, invalid requests',async()=>{
  const server=await createSiteServer({directory:new URL('./candidate/',import.meta.url),port:4180,published:true});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=server.address().port;
  const request=(pathname,host='itotexpress.com',method='GET')=>new Promise((resolve,reject)=>{
    const req=http.request({host:'127.0.0.1',port,path:pathname,method,headers:{Host:host}},res=>{
      let body='';res.on('data',chunk=>body+=chunk);res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body}));
    });req.on('error',reject);req.end();
  });
  try {
    for(const name of ['','network-audits.html','technical-documentation.html','website-development.html','ai-analysis.html','samples.html']) {
      const response=await request('/'+name);assert.equal(response.status,200);assert.match(response.body,/<h1/);assert.doesNotMatch(response.body,/herman|goldstein|linkedin\.com|data-request=|REQUEST PREVIEW/i);
      assert.equal(response.headers['x-robots-tag'],undefined);
      assert.match(response.body,new RegExp('<link rel="canonical" href="https://itotexpress.com/'+name.replaceAll('.','\\.')+'">'));
    }
    assert.match((await request('/sitemap.xml')).body,/<loc>https:\/\/itotexpress.com\/<\/loc>/);
    assert.match((await request('/robots.txt')).body,/Disallow: \//);
    assert.equal((await request('/site.css')).headers['content-type'],'text/css; charset=utf-8');
    const head=await request('/','itotexpress.com','HEAD');assert.equal(head.status,200);assert.equal(head.body,'');
    const policy=head.headers['content-security-policy'];
    assert.match(policy,/connect-src 'none';/);
    assert.match(policy,/form-action 'none';/);
    assert.match(policy,/frame-ancestors 'none'/);
    assert.equal((await request('/','evil.example')).status,403);
    assert.equal((await request('/','itotexpress.com','POST')).status,405);
    for(const host of ['itotexpress.com','www.itotexpress.com']) {
      for(const route of ['/palzivalerts','/palzivalerts/employee','/palzivalerts/hr','/palzivalerts/other?old=true']) {
        const retired=await request(route,host);
        assert.equal(retired.status,410);assert.equal(retired.headers.location,undefined);
      }
      const retiredHead=await request('/palzivalerts/hr',host,'HEAD');
      assert.equal(retiredHead.status,410);assert.equal(retiredHead.body,'');
    }
    for(const p of ['/missing.html','/.git/config','/%2e%2e%5cBUSINESS_PROFILE.md','/%00','/../BUSINESS_PROFILE.md','/server.mjs']) assert.equal((await request(p)).status,404,p);
    const redirect=await request('/network-audits.html?source=test','www.itotexpress.com');assert.equal(redirect.status,308);assert.equal(redirect.headers.location,'https://itotexpress.com/network-audits.html?source=test');
    assert.equal((await request('/index.html')).headers.location,'https://itotexpress.com/');
  } finally {await new Promise(resolve=>server.close(resolve));}
});

test('candidate stays noindex and does not accept public hostnames',async()=>{
  const server=await createSiteServer({directory:new URL('./candidate/',import.meta.url),port:4180});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try {
    const request=host=>new Promise((resolve,reject)=>{
      http.get({host:'127.0.0.1',port:server.address().port,path:'/',headers:{Host:host}},res=>{
        let body='';res.on('data',chunk=>body+=chunk);res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body}));
      }).on('error',reject);
    });
    const response=await request('localhost:4180');
    assert.equal(response.status,200);assert.equal(response.headers['x-robots-tag'],'noindex, nofollow');
    assert.match(response.body,/noindex, nofollow/);
    assert.equal((await request('itotexpress.com')).status,403);
    const robots=await readFile(new URL('./candidate/robots.txt',import.meta.url),'utf8');assert.match(robots,/Disallow: \//);
  } finally {await new Promise(resolve=>server.close(resolve));}
});
