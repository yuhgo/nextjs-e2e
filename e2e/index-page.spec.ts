import { expect, test } from "@playwright/test";

test("IndexページにHello Worldが表示されている", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle("e2e lesson");
	await expect(page.getByRole("heading")).toHaveText("Hello World🚀");
});
