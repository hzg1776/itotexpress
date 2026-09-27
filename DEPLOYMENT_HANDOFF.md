# Cloudflare Pages release and migration

## Review gate

Keep the owner review and merge requirement for every production release. Do not attach the public domain or stop the Windows host and Cloudflare Tunnel while the PR or preview is still under review.

From a clean checkout of the proposed commit, run:

```powershell
node check-site.mjs
node --test build.test.mjs server.test.mjs
node prepare-site.mjs --release --output=cloudflare-preview
node verify-release.mjs --output=cloudflare-preview
```

Start the Cloudflare runtime in one terminal, then run its integration checks in a second terminal:

```powershell
npx --yes wrangler@4.141.0 pages dev cloudflare-preview --ip 127.0.0.1 --port 8788 --compatibility-date=2026-09-26
```

```powershell
node --test cloudflare-pages.runtime.test.mjs
```

The preview bundle keeps the current CSP and other security headers, returns 410 from `/palzivalerts` and its descendants, and redirects the seven legacy `.html` paths to extensionless canonical URLs. The Pages Function is limited by `_routes.json` to that retired path, so normal pages and assets stay static. Preview hosts on `pages.dev` receive `X-Robots-Tag: noindex, nofollow`.

Deploy a branch preview with Wrangler from this repository root, where the `functions/` directory is present:

```powershell
npx --yes wrangler@4.141.0 pages deploy cloudflare-preview --project-name <pages-project> --branch=pages-preview
```

Run the same runtime tests against the deployed branch URL so they check Cloudflare's actual headers and Functions. In PowerShell, set `PAGES_PREVIEW_URL` to `https://<branch>.<project>.pages.dev`, run `node --test cloudflare-pages.runtime.test.mjs`, then clear that environment variable.

Use the existing Pages project if one is available. If a project must be created, authenticate Wrangler and select the Cloudflare account that owns the `itotexpress.com` zone. Pages custom domains require the Pages project and zone to be in the same account. Keep the project on Cloudflare Free. Use Wrangler for deployments because dashboard drag-and-drop does not compile a Pages Functions directory. Direct Upload remains manually controlled and does not install a GitHub deployment app. A Direct Upload project cannot later be converted to Git integration; switching workflows later would require creating a separate project.

Review the actual branch preview before merging the PR. Confirm:

- All seven pages render at `/`, `/network-audits`, `/industrial-networks`, `/technical-documentation`, `/website-development`, `/ai-analysis`, and `/samples`.
- `/index.html` redirects to `/`; each old page `.html` URL redirects to its extensionless path and preserves the query string.
- Static page and asset responses retain `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and the current Content Security Policy.
- `/palzivalerts`, `/palzivalerts/employee`, and `/palzivalerts/hr` return 410 with the security headers.
- The Zoho contact link opens the existing public form. Do not submit a test inquiry.
- `robots.txt`, the sitemap and the preview's `noindex` response header are correct.

The contact link navigates to Zoho Forms; it is not a form submission endpoint on Pages. The CSP keeps `form-action 'none'` because this site has no HTML form posting data from its origin.

## Production cutover

After the owner approves and merges the PR, build and verify again from the exact merged `main` commit. Deploy that build to the Pages production branch with Wrangler, then verify the production `pages.dev` address before attaching custom domains.

Before switching DNS, save a copy of the current zone DNS records and record the active tunnel hostname, local release path, server process, and startup mechanism. Add a Cloudflare Single Redirect for the `www` hostname:

- Request URL: `https://www.itotexpress.com/*`
- Target URL: `https://itotexpress.com/${1}`
- Status code: `308`
- Preserve query string: enabled

Test the `www` redirect while the current apex site is still available. Then associate both `itotexpress.com` and `www.itotexpress.com` with the Pages project. The `www` redirect runs before Pages and makes the apex hostname canonical; keeping both Pages hostnames attached lets `www` continue resolving if that rule is later disabled. Verify the final redirects, seven pages, security headers, 410 response, sitemap and Zoho form on the public host.

Cloudflare Free supports 20,000 Pages files and 25 MiB per asset. The current release has 38 files and its largest asset is 380,665 bytes; Pages adds three control files and a custom `404.html`. Static asset requests are free and unlimited. The retired-route Function is deliberately the only route that invokes a Function and counts toward the Workers Free request quota.

## Retire the old host

Only after the public-domain checks pass, stop and disable the local Node server and its startup task/service, remove the host's Cloudflare Tunnel route and credentials, and confirm the tunnel no longer serves the domain. Keep the previous release and a DNS/tunnel configuration snapshot outside the repository and public web root for rollback; keep any credential backup only in the owner's private credential storage. Record the merged commit, Pages deployment URL, check results and retirement actions.

If a public check fails, restore the saved tunnel DNS target and re-enable the previous host. Do not remove the fallback until the Pages cutover is verified.

## Cloudflare references

- [Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Pages serving behavior and HTML URL redirects](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Pages response headers](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
- [Pages Functions routing and static-route exclusions](https://developers.cloudflare.com/pages/functions/routing/)
- [Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/)
- [Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Cloudflare Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/)
