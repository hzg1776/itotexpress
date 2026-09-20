import {cp, mkdir, readdir, readFile, writeFile, access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const publish=process.argv.includes('--release');
const origin='https://itotexpress.com';
const source=new URL('./dist/',import.meta.url);
const destination=new URL(publish?'./release/':'./candidate/',import.meta.url);
const names=(await readdir(source)).filter(name=>name.endsWith('.html'));
const pages=await Promise.all(names.map(async name=>[name,await readFile(new URL(name,source),'utf8')]));
if(publish) {
  for(const [name,html] of pages) {
    if(/data-request=|Public (?:email|phone) to be added|REQUEST PREVIEW|options below are previews|Business contact details coming soon|not accepting inquiries yet/i.test(html)) throw Error(`${name}: contact previews or missing contact details must be resolved before release`);
  }
}
// Fail closed on an old artifact rather than leave stale public files in a release.
try {await access(destination);throw Error(`Output already exists: ${fileURLToPath(destination)}. Move it aside after review before rebuilding.`);} catch(error) {if(error.code!=='ENOENT') throw error;}
await mkdir(destination,{recursive:true});
await cp(source,destination,{recursive:true});
for(const [name,input] of pages) {
  const url=origin+(name==='index.html'?'/':'/'+name);
  let html=input.replace(/\s*<link rel="canonical"[^>]*>/g,'').replace(/\s*<meta property="og:url"[^>]*>/g,'');
  html=html.replace('</head>',`  <link rel="canonical" href="${url}">\n  <meta property="og:url" content="${url}">\n</head>`);
  html=html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,(_,json)=>{
    const schema=JSON.parse(json);schema.url=url;schema['@id']=url+'#'+(schema['@type']==='Organization'?'organization':'content');
    if(schema.provider) {schema.provider.url=origin+'/';schema.provider['@id']=origin+'/#organization';}
    if(schema.publisher) {schema.publisher.url=origin+'/';schema.publisher['@id']=origin+'/#organization';}
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  });
  if(publish) html=html.replace('content="noindex, nofollow"','content="index, follow"').replace(/<div class="draft-bar">[\s\S]*?<\/div><\/div>/g,'').replaceAll('<span>Unpublished working draft</span>','');
  await writeFile(new URL(name,destination),html);
}
await writeFile(new URL('robots.txt',destination),publish?`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
await writeFile(new URL('sitemap.xml',destination),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+names.map(name=>`  <url><loc>${origin}${name==='index.html'?'/':'/'+name}</loc></url>`).join('\n')+'\n</urlset>\n');
console.log(`Prepared ${pages.length} pages in ${fileURLToPath(destination)}; ${publish?'indexable release':'noindex local candidate'}. Nothing deployed.`);
