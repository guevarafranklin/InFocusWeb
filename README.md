# infocustempo.com

Astro site for the InFocus App Store listing and shared workouts. It builds to plain
static HTML and CSS: no web fonts, no trackers. The only client script is inline on `/w`;
it reads the workout from the link's `#fragment` in the visitor's browser and makes no
network requests.

| Page | URL | App Store Connect field | Source |
| --- | --- | --- | --- |
| Home | https://infocustempo.com/ | Marketing URL | `src/pages/index.astro` |
| Privacy (en) | https://infocustempo.com/privacy/ | Privacy Policy URL, English (U.S.) | `src/pages/privacy/index.astro` |
| Support (en) | https://infocustempo.com/support/ | Support URL, English (U.S.) | `src/pages/support/index.astro` |
| Privacy (es) | https://infocustempo.com/es/privacy/ | Privacy Policy URL, Spanish (Mexico) | `src/pages/es/privacy/index.astro` |
| Support (es) | https://infocustempo.com/es/support/ | Support URL, Spanish (Mexico) | `src/pages/es/support/index.astro` |
| Shared workout | https://infocustempo.com/w#1.… | (opened by QR codes and share links) | `src/pages/w/index.astro` |

## Shared workout links (InFocus 1.1, SPEC 10.5)

- `public/.well-known/apple-app-site-association` lets `https://infocustempo.com/w…`
  open InFocus directly (Universal Links) for app ID `F46NV4BFQE.com.infocustempo.app`.
- `public/_headers` serves that file as `application/json`, which Apple requires.
- `/w` is what a phone without InFocus shows: the workout summary in English or Spanish
  (from the browser language) and an App Store button. Keep its decoding in step with
  the app's `SharedWorkout` codec.

After each deploy, check what Apple sees (its CDN can take a few hours to refresh):

```bash
curl -s https://app-site-association.cdn-apple.com/a/v1/infocustempo.com
```

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

## Deploy (Cloudflare, free)

**Workers from Git (rebuilds on every push):** Cloudflare dashboard → Workers & Pages →
Create → Import a repository, pick this repo, then set build command `npm run build` and
deploy command `npx wrangler deploy`. `wrangler.jsonc` tells Wrangler to upload `dist/`
as static assets. Keep that file: without it, `wrangler deploy` tries to convert the
project to a server-rendered Astro app and the deploy fails.

**Pages from Git:** Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to
Git, pick this repo, then set:

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION` = `24` (package.json requires Node ≥ 22.23.4)

**Direct upload:** run `npm run build`, then either upload `dist/` under Pages → Upload
assets, or run `npx wrangler pages deploy dist`.

Then add `infocustempo.com` under Custom domains, and set up `support@infocustempo.com`
in Cloudflare → Email → Email Routing, forwarding to your inbox. The privacy and support
pages both point to it.

## App Store badge

InFocus is live, so `APP_STORE_URL` is set and the home pages show a plain "Download on
the App Store" link. To show Apple's badge instead:

1. Download Apple's official "Download on the App Store" badges (black, SVG) from
   https://toolbox.marketingtools.apple.com/en-us/app-store/ in English (US) and
   Spanish (MX). Save them unmodified as `public/badges/app-store-en.svg` and
   `public/badges/app-store-es.svg`.
2. In `src/i18n/ui.ts`, set `HAS_BADGE_ART` to `true`.
3. Build and deploy. Both home pages show the badge in their language, and Safari on
   iPhone shows the Smart App Banner (`apple-itunes-app` meta tag) on every page.

## Before each release

- The privacy policy describes InFocus 1.1: camera for Scan QR, photos (add only) for
  card images, notifications for focus cues and planned blocks, workouts inside share
  links. Update it and its effective date (both languages) before shipping the Watch app
  (Apple Health) or Pro live links (network, SPEC 17.5).
