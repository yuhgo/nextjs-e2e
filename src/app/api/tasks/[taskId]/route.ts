import { nextAuthOptions } from "@/_lib/nextAuth/options";
import { deleteTask, getTaskById, updateTask } from "@/_lib/prisma/tasks";
import { getObjectFromRequestBodyStream } from "@/app/api/_lib/requestDecoder";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { taskIdSchema, updateTaskSchema } from "schema/task";

type Params = {
	params: {
		taskId: string;
	};
};

export const GET = async (_req: Request, { params }: Params) => {
	const session = await getServerSession(nextAuthOptions);

	if (!session) {
		return new Response("You must sign in to access this endpoint", {
			status: 401,
		});
	}

	const validationRes = taskIdSchema.safeParse(params);
	if (!validationRes.success) {
		return new Response("Invalid input data", {
			status: 400,
		});
	}

	try {
		const { task, error } = await getTaskById(validationRes.data);
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

export const DELETE = async (_req: Request, { params }: Params) => {
	const session = await getServerSession(nextAuthOptions);

	if (!session) {
		return new Response("You must sign in to access this endpoint", {
			status: 401,
		});
	}

	const validationRes = taskIdSchema.safeParse(params);

	if (!validationRes.success) {
		return new Response("Invalid input data", {
			status: 400,
		});
	}

	try {
		const { task, error } = await deleteTask(validationRes.data);
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

export const PUT = async (req: Request, { params }: Params) => {
	const session = await getServerSession(nextAuthOptions);

	if (!session) {
		return new Response("You must sign in to access this endpoint", {
			status: 401,
		});
	}

	const reqBody = await getObjectFromRequestBodyStream<{ completed: boolean }>(req.body);

	const paramsValidationRes = taskIdSchema.safeParse(params);
	const updateValidationRes = updateTaskSchema.safeParse(reqBody);
	if (!(paramsValidationRes.success && updateValidationRes.success)) {
		return new Response("Invalid input data", {
			status: 400,
		});
	}

	try {
		const { task, error } = await updateTask(updateValidationRes.data, paramsValidationRes.data);
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
