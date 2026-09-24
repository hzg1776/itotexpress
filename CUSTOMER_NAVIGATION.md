# Customer navigation update

The September 23, 2026 customer-flow review identified hard-to-find drawing examples, a misleading discussion link, lengthy homepage reference content, and lost context when opening the inquiry form. The owner authorized all recommended changes.

- Technical Documentation includes a Network drawing example contents link. Experience links to the same drawing from its section index and written sample.
- The sample's Discuss a documentation project action leads to its contact section and selects Technical documentation.
- The homepage places process and experience immediately after service choices. Purdue preview and downloads remain visible; detailed IT/OT and production-planning explanations use native expandable sections. Existing deep links into collapsed content reveal their target.
- Contact sections offer an optional service choice that starts an editable inquiry message. Each service page also has a static prefilled form link for visitors without JavaScript. Only public service labels enter URLs; no customer-entered information is collected by this static website.

The existing free Zoho form was configured through its signed-in UI: the How can we help? field has alias `inquiry`, and a description block links back to https://itotexpress.com/. No submission, notification routing, required customer fields, subscription, or security settings were changed. The form remains hosted by Zoho. Its alias can remain safely if a website rollback is necessary; the return-link description can be edited in the form builder.

Validation covers existing build/server tests, local references, release hashes, in-app browser desktop/mobile navigation, keyboard disclosure behavior, service selection, the actual public form prefill, and its return link. No inquiry was submitted and inbox delivery was not retested.
