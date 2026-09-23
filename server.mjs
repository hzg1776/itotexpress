import http from 'node:http';
import {createReadStream} from 'node:fs';
import {realpath, stat, readFile} from 'node:fs/promises';
import {gzip} from 'node:zlib';
import {promisify} from 'node:util';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const types = {'.woff2':'font/woff2','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
const compress = promisify(gzip);
const textTypes = new Set(['.html','.css','.js','.json','.xml','.txt','.svg']);
const acceptsGzip = value => (value || '').split(',').some(part => {
  const [coding, ...parameters] = part.trim().toLowerCase().split(';');
  const quality = parameters.map(value => value.trim()).find(value => value.startsWith('q='));
  return coding.trim() === 'gzip' && (!quality || Number(quality.slice(2)) > 0);
});

// This server serves one public artifact directory; it never serves the business workspace.
export async function createSiteServer({directory, port=4180, published=false}={}) {
  const root = await realpath(directory || fileURLToPath(new URL('./candidate', import.meta.url)));
  const inside = file => file.startsWith(root + path.sep);
  // Cloudflare injects its analytics script and receives reports at /cdn-cgi/rum.
  // Local previews remain isolated from analytics.
  const scriptSources = published ? "'self' https://static.cloudflareinsights.com" : "'self'";
  const connectionSources = published ? "'self'" : "'none'";
  return http.createServer(async (req,res) => {
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
    res.setHeader('Content-Security-Policy',`default-src 'self'; img-src 'self' data:; style-src 'self'; script-src ${scriptSources}; connect-src ${connectionSources}; form-action 'none'; base-uri 'none'; frame-ancestors 'none'`);
    res.setHeader('Cache-Control','no-cache');
    if (!published) res.setHeader('X-Robots-Tag','noindex, nofollow');
    const finish = (status, text) => {res.writeHead(status,{'Content-Type':'text/plain; charset=utf-8'});res.end(req.method==='HEAD' ? undefined : text);};
    if (!['GET','HEAD'].includes(req.method)) {res.setHeader('Allow','GET, HEAD');return finish(405,'Method not allowed');}
    const host = req.headers.host?.toLowerCase();
    const allowed = [`127.0.0.1:${port}`,`localhost:${port}`,...(published ? ['itotexpress.com','www.itotexpress.com'] : [])];
    if (!allowed.includes(host)) return finish(403,'Host not allowed');
    try {
      if (!req.url.startsWith('/') || req.url.startsWith('//')) return finish(400,'Invalid request');
      const url = new URL(req.url,'http://local.invalid');
      const decoded = decodeURIComponent(url.pathname);
      if (decoded.includes('\\') || decoded.includes('\0') || decoded.split('/').some(p=>p.startsWith('.'))) return finish(404,'Not found');
      if (/^\/palzivalerts(?:\/|$)/i.test(decoded)) return finish(410,'This project has been retired.');
      if (published && (host==='www.itotexpress.com' || decoded==='/index.html')) {
        res.writeHead(308,{Location:`https://itotexpress.com${decoded==='/index.html' ? '/' : url.pathname}${url.search}`});return res.end();
      }
      const candidate = path.resolve(root,'.'+(decoded==='/'?'/index.html':decoded));
      if (!inside(candidate) || !types[path.extname(candidate)]) return finish(404,'Not found');
      const file = await realpath(candidate);
      if (!inside(file)) return finish(404,'Not found');
      const info = await stat(file);
      if (!info.isFile()) return finish(404,'Not found');
      if (textTypes.has(path.extname(file)) && info.size >= 1024) {
        res.setHeader('Vary', 'Accept-Encoding');
        if (acceptsGzip(req.headers['accept-encoding'])) {
          const body = await compress(await readFile(file));
          res.writeHead(200, {'Content-Type': types[path.extname(file)], 'Content-Encoding': 'gzip', 'Content-Length': body.length});
          return res.end(req.method === 'HEAD' ? undefined : body);
        }
      }
      res.writeHead(200,{'Content-Type':types[path.extname(file)],'Content-Length':info.size});
      if(req.method==='HEAD') return res.end();
      const stream=createReadStream(file);
      stream.on('error',()=>res.destroy());
      stream.pipe(res);
    } catch {return finish(404,'Not found');}
  });
}

if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const portArgument=process.argv.find(value=>value.startsWith('--port='));
  const port=Number(portArgument ? portArgument.slice(7) : process.env.ITOT_PORT || 4180);
  if(!Number.isInteger(port)||port<1024||port>65535) throw Error('ITOT_PORT must be 1024–65535');
  const published=process.argv.includes('--published');
  const directory=fileURLToPath(new URL(published?'./release':'./candidate',import.meta.url));
  const server=await createSiteServer({directory,port,published});
  server.requestTimeout=15000;
  server.headersTimeout=10000;
  server.listen(port,'127.0.0.1',()=>console.log(`Website listening on http://127.0.0.1:${port} (${published?'release':'noindex candidate'})`));
  for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.close(()=>process.exit(0)));
}
