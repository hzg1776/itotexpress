import http from 'node:http';
import {createReadStream} from 'node:fs';
import {stat, realpath} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = await realpath(fileURLToPath(new URL('./dist', import.meta.url)));
const port = Number(process.env.ITOT_PREVIEW_PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const server = http.createServer(async (req,res) => {
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; frame-ancestors 'none'");
  if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405);res.end();return;}
  if (![ `127.0.0.1:${port}`, `localhost:${port}` ].includes(req.headers.host)) {res.writeHead(403);res.end();return;}
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const candidate = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!candidate.startsWith(root+path.sep)) throw Error('Outside root');
    const file = await realpath(candidate);
    if (!file.startsWith(root+path.sep) || !(await stat(file)).isFile()) throw Error('Not a public file');
    res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream'});
    if (req.method === 'HEAD') res.end(); else createReadStream(file).pipe(res);
  } catch {res.writeHead(404);res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/`));
