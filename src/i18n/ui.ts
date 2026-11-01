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
