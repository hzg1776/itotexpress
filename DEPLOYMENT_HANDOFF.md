# Buyer-focused website release

This revision rewrites the website in clear English and organizes it around a business owner's hiring questions. It adds a dedicated industrial-network page, a four-stage project process, clearer scope descriptions and a labeled fictional documentation excerpt. It retains prior-role attribution for professional experience. Unknown commercial details are omitted.

## Validation

- Seven pages and 285 local references pass static checks.
- All five build/server tests pass.
- Release verification checks all seven routes, linked assets, indexing directives, canonical URLs, contact links, redirects, 404 and 410 responses. `RELEASE_CHECKS.json` records the release file hashes.
- Browser review covered all seven pages at 1440, 768 and 390px, plus the homepage at 320px, with no horizontal overflow or captured console errors. Navigation, anchors and menu dismissal were checked.
- The contact form opened correctly. No new message was submitted; delivery and response time were not tested.

## Owner-operated publication

1. Review and merge the website PR into `main`. Record the merged commit SHA.
2. In a fresh non-production checkout of that exact SHA, use `git -c core.autocrlf=false clone` to preserve LF source bytes. Save the committed `RELEASE_CHECKS.json` before running the verifier, which writes a new timestamped report.
3. Run `node check-site.mjs`, `node --test build.test.mjs server.test.mjs`, `node prepare-site.mjs --release`, and `node verify-release.mjs`. Compare the SHA-256 map with the saved committed manifest; all file names and hashes must match.
4. Using the owner's existing hosting procedure, confirm the active static release location and preserve a full rollback copy outside the public web root. Replace the complete static release with the verified artifact. This change does not require server, DNS, tunnel, credential or hosting-configuration changes.
5. Check all seven public pages and linked assets, including `/industrial-networks.html`; confirm robots/sitemap, contact destinations, canonical redirects and expected 404/410 responses. Compare public response bodies with the manifest where applicable. Restore the backup if validation fails.
6. Record the deployed commit, verification result and rollback location. Do not report publication complete before these checks.

The agent prepared and checked this release locally. Production deployment remains owner-operated under the repository rules; no production access or deployment was performed for this revision.
