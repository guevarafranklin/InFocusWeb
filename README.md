# infocustempo.com

Astro site for the InFocus App Store listing. It builds to plain static HTML and CSS:
no client JavaScript, no web fonts, no trackers.

| Page | URL | App Store Connect field | Source |
| --- | --- | --- | --- |
| Home | https://infocustempo.com/ | Marketing URL | `src/pages/index.astro` |
| Privacy (en) | https://infocustempo.com/privacy/ | Privacy Policy URL, English (U.S.) | `src/pages/privacy/index.astro` |
| Support (en) | https://infocustempo.com/support/ | Support URL, English (U.S.) | `src/pages/support/index.astro` |
| Privacy (es) | https://infocustempo.com/es/privacy/ | Privacy Policy URL, Spanish (Mexico) | `src/pages/es/privacy/index.astro` |
| Support (es) | https://infocustempo.com/es/support/ | Support URL, Spanish (Mexico) | `src/pages/es/support/index.astro` |

The shared `<head>`, header, nav and footer live in `src/layouts/BaseLayout.astro`;
nav labels and URL helpers are in `src/i18n/ui.ts`. Styles are `src/styles/global.css`,
icons are in `public/`.

## Develop

```bash
npm install
npm run dev        # or: astro dev --background (then astro dev stop)
npm run build      # writes the site to dist/
npm run preview    # serves dist/ locally
```

## Deploy (Cloudflare Pages, free)

**From Git (rebuilds on every push):** Cloudflare dashboard → Workers & Pages → Create →
Pages → Connect to Git, pick this repo, then set:

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION` = `24` (package.json requires Node ≥ 22.23.4)

**Direct upload:** run `npm run build`, then either upload `dist/` under Pages → Upload
assets, or run `npx wrangler pages deploy dist`.

Then add `infocustempo.com` under Custom domains, and set up `support@infocustempo.com`
in Cloudflare → Email → Email Routing, forwarding to your inbox. The privacy and support
pages both point to it.

## App Store badge (launch day)

Until the app is live, the home pages say "Coming soon to the App Store". To switch on
the download badge:

1. Download Apple's official "Download on the App Store" badges (black, SVG) from
   https://toolbox.marketingtools.apple.com/en-us/app-store/ in English (US) and
   Spanish (MX). Save them unmodified as `public/badges/app-store-en.svg` and
   `public/badges/app-store-es.svg`.
2. In `src/i18n/ui.ts`, set `APP_STORE_URL` to `https://apps.apple.com/app/id<Apple ID>`.
   The Apple ID is under App Store Connect → your app → App Information.
3. Build and deploy. Both home pages show the badge in their language, and Safari on
   iPhone shows the Smart App Banner (`apple-itunes-app` meta tag) on every page.

## Before each release

- The privacy policy describes InFocus 1.0 (no network, no Health, no camera). Update it
  and its effective date (both languages) before shipping the Watch app (Apple Health),
  QR scanning (camera) or Pro live links (network, SPEC 17.5).
- Release 1.1 adds `public/.well-known/apple-app-site-association` and the `/w` share page.
