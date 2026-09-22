# Plant-Network Section Deployment

This update adds the owner-approved Industrial Networks & Plant Connectivity section before AI on the homepage. It includes four service areas, a contact button and a shared footer link. Headings and service labels use Title Case throughout the six pages. No server code, assets, accounts or dependencies are changed.

## Validation

- Six source pages and 231 local references pass the static checker.
- All five Node tests pass.
- Release verification passes six pages and 25 linked resources; RELEASE_CHECKS.json records 35 artifact hashes.
- Recent Lighthouse audit of this content: five mobile pages 99 performance, AI 100; desktop homepage 100. Accessibility and best practices 100 throughout. SEO remains 92 because Lighthouse's robots fetch is blocked by CSP; direct retrieval and the unmodified validator pass.
- Browser review at 320, 390, 768 and 1440 pixels showed no horizontal overflow. The section uses two desktop columns and one mobile column. Contact and footer links were checked.

## Release and Rollback

1. Merge only the reviewed revision. Fetch and check out the resulting immutable merge SHA in a separate non-production checkout.
2. Build a fresh indexable release and run verify-release.mjs. Verify its artifact hashes against the reviewed manifest. Check that deployed server.mjs exactly matches the unchanged approved server.
3. Preserve the prior release, server and deployment metadata outside the public web root. Stage and hash-verify all 35 replacement files before touching the live release.
4. Using the existing approved hosting location, move the current release into the rollback directory and rename the staged directory to release. No server replacement, service restart, tunnel change or DNS change is needed for this static-only update. The existing Node server reads the release path on each request.
5. Verify all six public pages, the new section, Title Case headings, contact destination, assets/fonts, robots/sitemap and HTTP/www redirects. Check expected 404 and 410 responses. If validation fails, move the unsuccessful release aside and restore the preserved release directory.

Previous hosting records identify C:/ITOTExpress/site on loopback port 4181; verify the actual target before a deployment. Do not expose the repository itself as the web root. Inbox delivery and Google recrawl are separate checks and were not repeated for this content update.
