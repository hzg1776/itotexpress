# IT/OT Express LLC website

Seven static pages with local fonts and icons. Node.js is the only development prerequisite. No package installation or paid tooling is required.

## Preview and edit

Run `node preview.mjs` and open http://127.0.0.1:4173. The preview serves only `dist`, binds to loopback, and sends noindex headers.

- `dist/index.html`: homepage and shared navigation, contact section and footer.
- `dist/site.css`, `dist/no-script.css`, `dist/app.js`: styles and responsive navigation.
- `service-pages.mjs`: five service pages, including industrial networks.
- `sample-content.html` and `sample-page.mjs`: Experience content and generator.

After editing, regenerate service/Experience pages and verify:

```powershell
node service-pages.mjs
node sample-page.mjs
node check-site.mjs
node --test build.test.mjs server.test.mjs
```

## Build a release

Use a clean checkout with LF source files (`git -c core.autocrlf=false clone ...`). The indexable output includes the Cloudflare Pages headers, legacy-path redirects and narrowly scoped retired-route configuration.

```powershell
node prepare-site.mjs
node prepare-site.mjs --release
node verify-release.mjs
```

The build refuses to overwrite an existing output directory. Preserve earlier outputs before rebuilding. Candidate is noindex; release is indexable with canonical URLs, robots, sitemap and Pages configuration. To create a separate Pages bundle without touching the saved release, use `node prepare-site.mjs --release --output=cloudflare-preview` and `node verify-release.mjs --output=cloudflare-preview`. Both output directories are ignored. `verify-release.mjs` serves the selected bundle on an ephemeral loopback port and records SHA-256 hashes in `RELEASE_CHECKS.json`. It never contacts production.

## Current content

The homepage offers office-network, industrial-network and documentation paths, followed by AI services and a four-stage project process. The Experience page distinguishes prior-role experience from a clearly labeled fictional documentation excerpt. That excerpt is illustrative, not customer evidence. The reporting example has a qualitative outcome with no invented metrics.

Unconfirmed availability, service coverage, emergency response, travel/assessment charges and support terms are omitted. Do not add rates, credentials, response guarantees or other unknown business details.

Every page links to the existing Zoho inquiry form and `hello@itotexpress.com`. The email link opens the visitor's mail application. The current review opened the form but did not submit a message or test delivery.

## Release handoff

See [DEPLOYMENT_HANDOFF.md](DEPLOYMENT_HANDOFF.md) for the Cloudflare Pages preview, review gate, cutover and rollback sequence. GitHub publication does not deploy the site. The owner reviews and merges the PR, then controls production deployment.
