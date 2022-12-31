/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{html,js}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Manrope", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
