// Generate the sample page using the same navigation, contact and footer as the site.
import {readFile, writeFile} from 'node:fs/promises';
const root = new URL('./dist/', import.meta.url);
const home = await readFile(new URL('index.html', root), 'utf8');
const get = pattern => {const match = home.match(pattern)?.[0]; if (!match) throw Error(`Missing shared section: ${pattern}`); return match;};
const title = 'Sample Network Review & Document Lookup | IT/OT Express LLC';
const description = 'Fictional network review and documentation samples, with an interactive document-lookup prototype from IT/OT Express LLC.';
const schema = {'@context':'https://schema.org','@type':'WebPage',name:title,description,publisher:{'@type':'Organization',name:'IT/OT Express LLC'}};
const head = home.slice(0,home.indexOf('<body>'))
  .replace(/\s*<script type="application\/ld\+json" id="site-name-schema">[\s\S]*?<\/script>/, '')
  .replace(/<link rel="canonical"[^>]*>/, '<link rel="canonical" href="https://itotexpress.com/samples.html">')
  .replace(/<meta property="og:url"[^>]*>/, '<meta property="og:url" content="https://itotexpress.com/samples.html">')
  .replace(/<title>.*?<\/title>/,`<title>${title.replaceAll('&','&amp;')}</title>`)
  .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${description}">`)
  .replace(/<meta property="og:title" content="[^"]*">/,`<meta property="og:title" content="${title.replaceAll('&','&amp;')}">`)
  .replace(/<meta property="og:description" content="[^"]*">/,`<meta property="og:description" content="${description}">`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,`<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
  .replace('</head>','  <script type="module" src="sample-demo.js"></script>\n</head>');
const header = get(/<header class="site-header">[\s\S]*?<\/header>/)
  .replace('href="#main"','href="index.html"').replace('href="#services"','href="index.html#services"')
  .replace('href="#ai"','href="index.html#ai"').replace('href="#approach"','href="index.html#approach"').replace('href="#about"','href="index.html#about"');
const content = await readFile(new URL('./sample-content.html',import.meta.url),'utf8');
const html = `${head}<body class="sample-page">
<a class="skip-link" href="#main">Skip to content</a>
${header}<main id="main" tabindex="-1">${content}
${get(/<section id="contact"[\s\S]*?<\/section>/)}</main>
${get(/<footer class="site-footer">[\s\S]*?<\/footer>/).replace('href="#main"','href="index.html"')}
</body></html>`;
await writeFile(new URL('samples.html',root),html);
// The browser-only fictional demo modules are included in dist/ so this package
// can be checked out independently of the private business-planning workspace.
console.log('Updated samples.html; existing browser-only demo modules preserved');
