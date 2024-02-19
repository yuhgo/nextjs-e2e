import { prisma } from "@/_lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

declare module "next-auth" {
	interface Session {
		user?: {
			id: string;
		} & DefaultSession["user"];
	}
}

export const nextAuthOptions = {
	debug: false,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	callbacks: {
		session: ({ session, user }) => {
			return {
				...session,
				user: {
					...session.user,
					id: user.id,
				},
			};
		},
	},
} satisfies NextAuthOptions;
