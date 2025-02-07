/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/**/*.ejs"],
	theme: {
		extend: {
			fontFamily: {
				ubuntu: ["Ubuntu", "sans-serif"],
			},
		},
	},
	plugins: [],
};
