# IT/OT Express LLC website

Five-page static consulting website for North Carolina business owners. Network audits and technical documentation lead the service presentation, followed by AI analysis and automation.

## Status

Unpublished review package. Business inquiries use hello@itotexpress.com; the owner confirmed the send-and-reply test. There are no personal names, portraits or LinkedIn links. The site provides an email link, with no web form or booking system. No hosting service, tunnel route or automated deployment is installed by this package.

## Local review

Requires an existing Node.js 22 or newer installation; no npm dependencies or build-tool installation is needed.

```powershell
node service-pages.mjs
node sample-page.mjs
node check-site.mjs
node prepare-site.mjs
node --test server.test.mjs
node server.mjs
```

Open http://127.0.0.1:4180/ . Stop with Ctrl+C. The candidate stays noindex and the server binds only to loopback. It serves only the candidate artifact, not the working directory.

`dist/index.html` is the authored homepage. Service and sample generators share its navigation, contact section and footer. Demo modules are included in `dist/`; they use fictional data and do not call an AI model or external service.

The artifact generator refuses to overwrite an existing candidate/release. Move the previous artifact to a reviewed backup location before rebuilding. Do not keep old versions inside the public artifact folder.

## Release requirements

1. Business email is implemented and owner-tested.
2. The owner retired the old portal; its DNS connections were removed. The new server returns 410 for its old paths.
3. Review the final website revision through the owner's GitHub and merge process.
4. Run `node prepare-site.mjs --release`. This generates a local indexable artifact; it does not publish anything.
5. Configure persistent Windows startup/recovery and the Cloudflare Tunnel separately. Owner-controlled activation must serve only `release/`, through `node server.mjs --published` on loopback port 4180. `StartWebsite.ps1` is a launcher, not a task/service installer.
6. Verify reboot recovery, external HTTPS availability, redirects, sitemap, robots directives and contact behavior before calling the site production ready.
7. Use the existing Search Console property to inspect the public release and submit its sitemap. Track future results against the old-site baseline; do not attribute historical traffic to this unpublished version.

Canonical production origin: `https://itotexpress.com`. The server redirects `www` to the apex when run in published mode. Cloudflare must enforce HTTPS. Preserve existing Zoho email DNS records. Use a fresh website tunnel rather than the retired portal configuration. Keep tunnel credentials outside the repository.

The server tests exercise local HTTP handling with the noindex candidate; they do not prove that the tunnel, Windows startup or public website is working.
