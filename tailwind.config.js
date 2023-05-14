/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'ess-orange': '#ff931e;'
			},
			spacing: {
				logo: '6rem'
			}
		}
	},
	plugins: []
};
