# IT/OT scope update — release handoff

Prepared September 23, 2026 against website main commit `046b047faaea9f5345fcfc0a30ba7ef21267847d`.

## Customer-facing change

The homepage explains the wider IT/OT environment with a credited CPwE architecture diagram, four plain-language layers, and direct links to relevant services. Industrial network and documentation pages describe planning, switches, copper and fiber links, cabinets, labels, testing, and handover records. The existing PRP hero diagram stays in place.

The architecture image is the original JPEG extracted from the owner-supplied February 2023 guide: 325,512 bytes, replacing a 5,527,016-byte screenshot. It has no Windows activation overlay. No hosting, server, tunnel, analytics, mail settings, or contact-form destinations change.

## Verification

- Six existing Node tests passed.
- Seven source pages and 295 local references passed the site checker.
- Fresh indexable release: seven pages, 26 linked resources, redirects, 404/410 behavior, and 35 artifact SHA-256 hashes checked by `verify-release.mjs`.
- Desktop (1280 × 900) and mobile (390 × 844) review of the architecture and service links.
- The existing Zoho form accepted one owner-authorized test submission. Business-inbox receipt is not yet verified; submission success alone is not delivery proof.

## Owner-controlled publication

1. Review and approve the website PR, then merge it. Record the merged commit.
2. Use a fresh website-only checkout of that exact merged commit. Run `node --test build.test.mjs server.test.mjs`, `node check-site.mjs`, `node prepare-site.mjs --release`, and `node verify-release.mjs`. Compare the generated `sha256` map to the reviewed `RELEASE_CHECKS.json` (the check timestamp will differ).
3. Use the existing human-controlled deployment process to back up the current static release and publish the complete verified `release` directory. This update does not require changes to the server process or hosting configuration. Keep the backup outside the public web root.
4. Check the public homepage and all service pages, the JPEG and full-size link, the three “Where we help” links, and the contact link. Confirm the new content is present and the image loads on mobile. Restore the backup if verification fails.
5. Confirm the test notification reaches the intended business inbox before treating lead delivery as verified.

This handoff prepares publication; it does not access or alter production.
