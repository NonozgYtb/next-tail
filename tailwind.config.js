const colors = require("tailwindcss/colors");

const _pluginFlexBasis = function ({ addUtilities, e, theme, variants }) {
	const utilities = Object.entries(theme("flexBasis")).map(
		([value, modifier]) => ({
			[`.${e(`flex-basis-${value}`)}`]: { "flex-basis": modifier },
		})
	);

	addUtilities(utilities, variants("flex-basis"));
};

module.exports = {
	purge: {
		content: [
			"./pages/**/*.tsx",
			"./components/**/*.tsx",
			"./assets/scss/**/*.scss",
		],
		options: {
			safelist: [
				// /order/,
			],
		},
	},
	darkMode: false, // or 'media' or 'class'
	plugins: [_pluginFlexBasis],
	theme: {
		flexBasis: {
			0: "0",
			auto: "auto",
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",

			black: colors.black,
			white: colors.white,
			gray: colors.coolGray,
			// rose: colors.rose,
			// pink: colors.pink,
			// fuchsia: colors.fuchsia,
			// purple: colors.purple,
			// violet: colors.violet,
			// indigo: colors.indigo,
			// blue: colors.blue,
			// sky: colors.sky,
			// cyan: colors.cyan,
			teal: colors.teal, //base color
			// emerald: colors.emerald,
			// green: colors.green,
			// lime: colors.lime,
			// yellow: colors.yellow,
			// amber: colors.amber,
			// orange: colors.orange,
			// red: colors.red,
		},
		extend: {
			lineHeight: {
				0: "0px",
			},
			blur: {
				1: "1px",
			},
			boxShadow: {
				block: "0px 6px 13px #000000e3",
				hov: "0px 1px 6px 0px #0009",
			},
			zIndex: {
				"bg-site": "-1000",
				hovering: "100",
				tooltip: "4500",
				"nav-bar": "5000",
				"nav-dropdown": "5001",
				minus: "-10",
			},
			backgroundColor: {
				skin: {},
			},
		},
	},
	variants: {
		extend: {
			filter: ["hover", "focus"],
			borderWidth: ["responsive"],
			margin: ["responsive"],
			visibility: ["group-hover", "hover", "focus"],
		},
	},
};
