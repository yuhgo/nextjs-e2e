import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import lineClamp from "@tailwindcss/line-clamp";
import typography from "@tailwindcss/typography";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";
// import { createThemes } from "tw-colors";

const { createThemes } = require("tw-colors");

const config: Config = {
	content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				zenAntique: ["var(--font-zen-antique)"],
			},
			keyframes: {
				fadeIn: {
					from: {
						opacity: "0",
						transform: "scale(0.9)",
					},
					to: {
						opacity: "1",
						transform: "scale(1)",
					},
				},
			},
			animation: {
				modal: "fadeIn 0.3s ease-out forwards",
			},
		},
	},
	darkMode: "class",
	plugins: [
		typography,
		forms,
		aspectRatio,
		lineClamp,
		createThemes({
			light: {
				primary: "#D136D1",
				default: "#fff",
			},
		}),
	],
};

export default withTV(config);
