// biome-ignore lint/style/noNamespace: <explanation>
// biome-ignore lint/style/useNamingConvention: <explanation>
declare namespace NodeJS {
	// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
	interface ProcessEnv extends Env {
		readonly GITHUB_ID: string | "";
		readonly GITHUB_ID_DEV: string | "";
		readonly GITHUB_ID_PROD: string | "";

		readonly GITHUB_SECRET: string | "";
		readonly GITHUB_SECRET_DEV: string | "";
		readonly GITHUB_SECRET_PROD: string | "";

		readonly NEXTAUTH_URL: string | "";
		readonly NEXTAUTH_URL_DEV: string | "";
		readonly NEXTAUTH_URL_PROD: string | "";

		readonly NEXT_PUBLIC_API_URL: string | "";
		readonly NEXT_PUBLIC_API_URL_DEV: string | "";
		readonly NEXT_PUBLIC_API_URL_PROD: string | "";

		readonly STRIPE_SECRET_KEY: string | "";

		readonly API_URL: string | "";
		readonly API_URL_DEV: string | "";
		readonly API_URL_PROD: string | "";

		readonly BASE_URL: string | "";
	}
}
