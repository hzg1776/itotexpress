# IT/OT Express LLC website

Six-page static website for North Carolina businesses, covering network and Wi-Fi reviews, technical documentation, website development and AI assessments.

## Review and build

Requires Node.js 22 or newer. No npm dependencies are needed.

```powershell
node service-pages.mjs
node sample-page.mjs
node check-site.mjs
node prepare-site.mjs
node --test server.test.mjs
node server.mjs --port=4193
```

The local preview at http://127.0.0.1:4193 stays noindex. Generators refuse to overwrite existing candidate or release directories; preserve previous artifacts outside the served directory before rebuilding.

The homepage is authored in `dist/index.html`. The generators share its header, footer and contact section with the service and sample pages. The examples use fictional records; the lookup demo does not use an AI model or send queries to a server.

Inquiries link to the business Zoho form, with hello@itotexpress.com as an alternative. No form is embedded. The approved futuristic logo and the headline Technology built around your business are used in this revision.

## Owner-controlled release

After reviewing and merging the GitHub pull request, build the approved merged revision in a separate non-production checkout:

```powershell
node prepare-site.mjs --release
```

This creates an indexable `release/` folder with six canonical URLs and a sitemap. It does not publish anything. Only the owner deploys the approved immutable revision using the existing hosting process. See `DEPLOYMENT_HANDOFF.md`.

Do not expose this repository or its parent directory as the web root. Preserve existing mail records, tunnel credentials and startup configuration. Tests use only local temporary servers; they do not establish public availability or production recovery.
