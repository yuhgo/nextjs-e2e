import { expect, test } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseUrl = `http://localhost:${PORT}`;

test("Shall render hello world", async ({ page }) => {
	// await page.goto("/");
	await page.goto("http://localhost:3000/");
	await expect(page).toHaveTitle("e2e lesson");
	await expect(page.getByRole("heading")).toHaveText("Hello World🚀");
});
