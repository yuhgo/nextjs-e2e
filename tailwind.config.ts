import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import lineClamp from "@tailwindcss/line-clamp";
import typography from "@tailwindcss/typography";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [typography, forms, aspectRatio, lineClamp],
};

export default withTV(config);
