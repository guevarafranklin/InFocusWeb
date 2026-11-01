// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://infocustempo.com',
	// Pages are folders with an index.html, so /privacy/ and /support/ need no rewrites.
	trailingSlash: 'always',
	build: { format: 'directory' },
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: { prefixDefaultLocale: false },
	},
});
