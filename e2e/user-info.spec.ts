import test, { expect } from "@playwright/test";

test("Session Tokenがない場合はGitHubのユーザー名が表示されない", async ({ page, context }) => {
	await context.clearCookies();
	await page.goto("/");
	await expect(page.getByRole("heading")).toHaveText("Hello World🚀");
	await expect(page.getByText("userA")).not.toBeVisible();
});

test("Session Tokenがある場合はGitHubのユーザー名が表示される", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading")).toHaveText("Hello World🚀");
	await expect(page.getByText("userA")).toBeVisible();
});
