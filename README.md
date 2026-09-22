# IT/OT Express LLC website

Six static pages covering network reviews, technical documentation, websites and AI consulting. The cream-and-blue layout uses local IBM Plex Sans headings, responsive navigation, optimized logos and a direct link to the existing Zoho contact form.

## Local review

Node.js 22 or newer; no npm dependencies required.

```powershell
node service-pages.mjs
node sample-page.mjs
node check-site.mjs
node prepare-site.mjs
node --test build.test.mjs server.test.mjs
node preview.mjs
```

Preview: http://127.0.0.1:4173. It serves `dist/` on loopback with noindex headers. The homepage supplies the shared page shell. Edit service content in `service-pages.mjs` and examples in `sample-content.html`. The fictional lookup runs in the browser and sends no queries to a server.

## Owner-controlled release

Review and merge the pull request, then check out its exact merged SHA in a separate non-production checkout:

```powershell
node prepare-site.mjs --release
node verify-release.mjs
```

The generator refuses to overwrite an existing artifact. Preserve any prior build before regenerating. The indexable `release/` directory is the complete static web root; do not expose this repository or its parent directory.

Follow [DEPLOYMENT_HANDOFF.md](DEPLOYMENT_HANDOFF.md) for the owner-run update and rollback. Fonts and icons are credited in [ASSETS.md](ASSETS.md). Contact links retain the existing Zoho destination and hello@itotexpress.com; inbox delivery was not retested for this rebuild.
