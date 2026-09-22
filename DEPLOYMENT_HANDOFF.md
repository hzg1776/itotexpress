# Owner deployment handoff

## Proposed update

Replace the prior design with the reviewed six-page cream-and-blue site: shorter homepage, conventional services followed by a dedicated AI section, IBM Plex Sans Semibold headings, local fonts, lossless WebP logos with PNG fallbacks, accessible mobile navigation and gzip text responses. Existing Zoho form and business email links are retained. Examples are clearly fictional.

## Local checks

Five Node tests and six source pages / 224 local references pass. All six pages were checked at 390px and 1440px with no horizontal overflow. The mobile menu opens and closes with Escape. Indexable release checks and exact artifact SHA-256 hashes are recorded in RELEASE_CHECKS.json. These checks do not establish production availability or current inbox delivery.

## Human execution

1. Review and merge the PR; record its merged commit SHA.
2. In a separate non-production website-only checkout, fetch and check out that SHA. Run the README verification commands, build a fresh release, and run verify-release.mjs. Compare its generated artifact hashes with the reviewed RELEASE_CHECKS.json.
3. Confirm the current hosting location, service and port using the established owner-controlled process. Earlier records identify C:/ITOTExpress/site and loopback port 4181; these are historical, not reverified by this review.
4. Preserve the current deployed release and server.mjs as a rollback copy outside the public web root. Stop the existing website service, replace its release directory with the complete approved release, and update server.mjs from the same revision. The server update supplies font MIME types and gzip; do not mix revisions. Keep hosting port, tunnel, mail configuration and credentials unchanged.
5. Start the existing service. Check all six public pages, the logo, mobile menu, contact link, robots.txt and sitemap.xml; verify the www redirect, missing-page 404 and retired portal 410. If a check fails, stop the service, restore both the saved release and server, and restart it.
6. Confirm a test inquiry reaches the intended inbox before relying on the site for leads. Review Google indexing after public availability is confirmed.

Deployment and production access remain human-controlled under the project rules. This package does not perform a deployment or create new hosting configuration.
