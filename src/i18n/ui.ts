export type Lang = 'en' | 'es';
export type Page = 'home' | 'support' | 'privacy';

export const ui = {
	en: {
		navLabel: 'Site',
		home: 'Home',
		support: 'Support',
		privacy: 'Privacy',
		switchLabel: 'Español',
	},
	es: {
		navLabel: 'Sitio',
		home: 'Inicio',
		support: 'Soporte',
		privacy: 'Privacidad',
		switchLabel: 'English',
	},
} as const;

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');

/** Site-relative URL for a page in a locale: `/`, `/support/`, `/es/privacy/`… */
export function localePath(lang: Lang, page: Page): string {
	const prefix = lang === 'en' ? '/' : `/${lang}/`;
	return page === 'home' ? prefix : `${prefix}${page}/`;
}

/**
 * App Store listing, e.g. 'https://apps.apple.com/app/id1234567890'. Leave empty until
 * the app is live: while empty, the home pages say "coming soon" instead of showing the
 * badge, and Safari's Smart App Banner stays off.
 */
export const APP_STORE_URL = '';

/** Numeric App Store ID from APP_STORE_URL, for the Smart App Banner. */
export const appStoreId = APP_STORE_URL.match(/\/id(\d+)/)?.[1];

/** Apple's official badge artwork per locale; download it, don't redraw it (see README). */
export const appStoreBadge = {
	en: { src: '/badges/app-store-en.svg', alt: 'Download on the App Store', comingSoon: 'Coming soon to the App Store for iPhone.' },
	es: { src: '/badges/app-store-es.svg', alt: 'Descargar en el App Store', comingSoon: 'Muy pronto en el App Store para iPhone.' },
} as const;
