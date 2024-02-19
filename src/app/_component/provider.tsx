"use client";

import type { FC, PropsWithChildren } from "react";

import { SessionProvider } from "next-auth/react";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return <SessionProvider basePath="/api/auth">{children}</SessionProvider>;
};
