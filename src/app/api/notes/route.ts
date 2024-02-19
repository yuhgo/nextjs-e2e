import { nextAuthOptions } from "@/_lib/nextAuth/options";
import { getNotes } from "@/_lib/prisma/notes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (_req: Request, _res: Response) => {
	const session = await getServerSession(nextAuthOptions);
	if (!session) {
		return new Response("You must sign in to access this endpoint", {
			status: 401,
		});
	}
	try {
		const { notes, error } = await getNotes();
		if (error) throw new Error(error);
		return NextResponse.json(notes, { status: 200 });
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return NextResponse.json({
			error: error.message,
		});
	}
};
