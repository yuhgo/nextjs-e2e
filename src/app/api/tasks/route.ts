import { nextAuthOptions } from "@/_lib/nextAuth/options";
import { createTask, getTasks } from "@/_lib/prisma/tasks";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { createTaskSchema } from "schema/task";

export const GET = async (_req: Request, _res: Response) => {
	const session = await getServerSession(nextAuthOptions);

	if (!session) {
		return new Response("You must sign in to access this endpoint", {
			status: 401,
		});
	}

	try {
		const { tasks, error } = await getTasks(session?.user.id);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if (error) throw new Error(error as any);

		return NextResponse.json(tasks, { status: 200 });
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return NextResponse.json({
			error: error.message,
		});
	}
};

export const POST = async (req: Request, _res: Response) => {
	const session = await getServerSession(nextAuthOptions);

	if (!session) {
		return new Response("You must sign in to access this endpoint", {
			status: 401,
		});
	}

	const validationRes = createTaskSchema.safeParse(req.body);
	if (!validationRes.success) {
		return new Response("Invalid input data", {
			status: 400,
		});
	}

	try {
		const { task, error } = await createTask(validationRes.data, session.user.id);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if (error) throw new Error(error as any);

		return NextResponse.json(task, { status: 200 });
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return NextResponse.json({
			error: error.message,
		});
	}
};
