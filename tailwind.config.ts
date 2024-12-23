import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			fontFamily: {
				display: ['"Comic Neue"', 'cursive'],
				body: ['"Poppins"', 'sans-serif']
			},
			colors: {
				'body-light-1': '#F5EBE4',
				'body-light-2': '#ffffff',
				substrate: '#f8f8fc',
				action: '#1726A2',
				goal: '#30B667'
			},
			keyframes: {
				customPop: {
					'0%': { transform: 'scale(0.8)', opacity: '0.5' },
					'50%': { transform: 'scale(1.1)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				customPop: 'customPop 1s ease-in-out'
			}
		}
	},
	plugins: [
		typography,
		forms,
		skeleton({
			themes: { preset: ['skeleton'] }
		})
	]
} satisfies Config;
