# Website assets

The cropped company logos, favicon, network illustration and icons came from the owner's supplied developer handoff. The full handoff and previous assets remain in the dated archive.

- Bricolage Grotesque, 700, Latin WOFF2: [upstream project](https://github.com/ateliertriay/bricolage). SIL Open Font License 1.1, copyright 2022 The Bricolage Grotesque Project Authors.
- IBM Plex Sans, 400/500/600, Latin WOFF2, and IBM Plex Mono, 400/500, Latin WOFF2: [IBM Plex](https://github.com/IBM/plex). SIL Open Font License 1.1, copyright 2017 IBM Corp., reserved font name Plex.
- Font assets retrieved September 22, 2026 from Google's official Fonts CSS/gstatic distribution. License copies retrieved from the matching directories in [google/fonts](https://github.com/google/fonts/tree/main/ofl) and retained under `dist/assets/fonts/`. The three identical Plex Sans downloads share one binary.
- Tabler SVG icons: MIT license, copyright 2020–2026 Paweł Kuna. License retained in `dist/assets/icons/LICENSE.txt`.

All page fonts and assets are hosted locally. No Google font request is made by a visitor. Unused large logo/image assets and unused icon/favicon variants were moved to the archive.

## CPwE architecture — September 23, 2026

At the owner's request, `dist/assets/cpwe-it-ot-architecture.jpg` uses the original embedded JPEG from PDF page 9 (Figure 1-2) of *Physical Infrastructure for the Converged Plantwide Ethernet Architecture*, February 2023, ENET-TD020B-EN-P, supplied by the owner. The caption credits Cisco, Panduit, and Rockwell Automation. It is a reference architecture, not a claimed customer installation or vendor endorsement.

The JPEG is extracted without recompression or visual modification: 1468 × 927 pixels, 325,512 bytes. It replaces a 5,527,016-byte owner-supplied screenshot containing a Windows activation overlay, reducing transfer size by 94.1%. The homepage loads it lazily and offers a link to its full size. The supplied PDF and screenshot remain outside the public release.

## Owner-supplied PRP diagram — September 23, 2026

`dist/assets/prp-network-redundant-paths.jpg` is the original JPEG supplied by the owner for replacing the sample illustration. It is copied without alteration and displayed at its original aspect ratio, with a full-size link. The caption identifies it as a network illustration; authorship and customer-project provenance have not been supplied and are not claimed.

## Delivery optimization — September 22, 2026

The header and footer use lossless WebP copies through `<picture>`, retaining the original PNGs as fallbacks and the existing dimensions. Pixel-by-pixel RGBA comparisons passed for both originals and decoded WebP copies. Header: 35,400 to 24,636 bytes; footer: 18,094 to 11,382 bytes. Combined savings: 17,476 bytes (32.7%). The footer image uses native lazy loading and asynchronous decoding.

The Plex Sans font file shared by headings and body text is preloaded with `as="font"`, the WOFF2 MIME type and `crossorigin`. Other fonts load as needed. `font-display: swap` and the existing security policy remain in place.

## Heading update — September 22, 2026

Main headings and service-card headings now use IBM Plex Sans at weight 600 for a more conventional technical appearance. The previous Bricolage declaration and preload were removed. Its licensed asset is retained for rollback but is no longer requested by pages. Existing Plex Sans covers both headings and body text without an additional font download.
