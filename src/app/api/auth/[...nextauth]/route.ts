import NextAuth from "next-auth";

import { nextAuthOptions } from "@/_lib/nextAuth/options";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
