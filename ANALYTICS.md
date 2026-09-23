# Visitor analytics and inquiry reporting

Cloudflare Web Analytics is configured for itotexpress.com using automatic injection, with EU visitors excluded. The published server permits the analytics script from `https://static.cloudflareinsights.com` and reporting to the site's own `/cdn-cgi/rum` endpoint. Cloudflare handles that endpoint before requests reach the origin. No analytics secret or manual tracking snippet belongs in this repository.

Local previews keep their original same-origin script policy and prohibit reporting connections. Published pages continue to prohibit inline/eval scripts, embedded frames and direct form submissions.

The owner can view visits, page views, referrers and page performance in Cloudflare Web Analytics. Those figures are different from HTTP Traffic's unique-IP/request counts, which include crawlers and test traffic. Our verification visits are test traffic, not leads. Historical page-view activity cannot be recovered by fixing tracking now.

Completed contact-form submissions are recorded separately in the existing Zoho Forms report. Count inquiries after excluding clearly marked tests, spam and duplicates; count follow-up replies as part of the same inquiry. Direct email inquiries are separate and need to be included from the business inbox. A page view or a click on a contact link is not a completed inquiry.

Customer details and raw submission exports must stay in the business applications, outside this repository. Cloudflare's free Web Analytics does not provide custom contact-click events or verified lead conversion tracking.

References: https://developers.cloudflare.com/web-analytics/faq/ and https://developers.cloudflare.com/web-analytics/get-started/.
