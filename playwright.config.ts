import path from "node:path";
import { type PlaywrightTestConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseUrl = `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
	timeout: 5 * 1000,
	testDir: path.join(__dirname, "e2e"),
	retries: 0,
	webServer: {
		command: "bun run start",
		url: baseUrl,
		timeout: 120 * 1000,
		reuseExistingServer: true,
	},
	globalSetup: "./e2e/config/globalSetup.ts",
	use: {
		// biome-ignore lint/style/useNamingConvention: <explanation>
		baseURL: baseUrl,
		storageState: "./e2e/config/storageState.json",
	},
	reporter: [["html", { open: "always" }]],
	projects: [
		{
			name: "Desktop Chrome",
			use: {
				...devices["Desktop Chrome"],
			},
		},
	],
};
// biome-ignore lint/style/noDefaultExport: <explanation>
export default config;
