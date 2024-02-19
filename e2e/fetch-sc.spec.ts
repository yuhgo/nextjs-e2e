import test, { expect } from "@playwright/test";

test("Session Tokenがない場合はNoteを表示しない", async ({ page, context }) => {
	await context.clearCookies();
	await page.goto("/fetch-sc");
	await expect(page.getByText("Data fetching in server failed")).toBeVisible();
	await expect(page.getByText("Note 1")).not.toBeVisible();
});

test("Session Tokenがある場合はNoteを表示する", async ({ page }) => {
	await page.goto("/fetch-sc");
	await expect(page.getByRole("heading")).toHaveText("Notes page by SC");
	await expect(page.getByText("Note 1")).toBeVisible();
});
