# Owner deployment handoff

## Proposed update

The six-page website now uses the approved futuristic branding, Technology built around your business headline, customer-facing service copy, responsive navigation and a direct Zoho contact-form link with an email alternative. The website-development page is included in the sitemap. Fictional examples remain labeled.

## Verification completed locally

- Six source pages and 181 local references pass the static checker.
- Both server tests pass, covering routes, redirects, retired paths, request restrictions and candidate isolation.
- An indexable release artifact is built locally; final release checks are recorded in RELEASE_CHECKS.json.
- No deployment, production access, DNS changes or service restart has been performed.

## Human execution

1. Review and merge the pull request, then record its merged commit SHA.
2. In a separate website-only checkout, fetch and check out that exact merged SHA. Run the README checks and build a fresh release.
3. Using the existing owner-controlled hosting process, preserve the current deployed release and server as a rollback copy outside the public web root. The prior launch record identifies C:/ITOTExpress/site and loopback port 4181; the owner must confirm these still apply before proceeding.
4. During the update, the owner stops the existing website service, replaces its release directory with the complete approved release and updates server.mjs from the same revision. Do not mix artifacts from different revisions. Keep the previous files intact for rollback. Keep the hosting port, tunnel and email configuration unchanged.
5. The owner starts the website service and checks all six public pages, the logo, mobile menu, contact link, sitemap and robots.txt. Check www redirects, a missing-page 404 and the retired portal 410. If any check fails, restore the saved release and server and restart the service.

This handoff does not authorize agent access to production. Deployment and public verification remain for the owner under the project approval matrix.
