"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const MonitorSession = () => {
	const router = useRouter();
	// TODO: getServerSessionを使ったほうが良いかも
	const { data: session } = useSession();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		router.refresh();
	}, [session]);

	return null;
};
