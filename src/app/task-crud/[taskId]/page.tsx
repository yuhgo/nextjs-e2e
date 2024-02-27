import type { Task } from "@prisma/client";
import { format } from "date-fns";
import type { FC } from "react";
import type { TaskId } from "schema/task";

import { API_URL } from "@/_lib/const";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
	params: TaskId;
};

const fetchSingleTask = async (data: { token: string | undefined } & TaskId) => {
	const url = `${API_URL}/tasks/${data.taskId}`;
	const res = await fetch(url, {
		headers: {
			cookie: `next-auth.session-token=${data.token}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data in server");
	}
	return (await res.json()) as Task;
};

const TaskDetailPage: FC<Props> = async (props) => {
	const { params } = props;

	const nextCookies = cookies();
	const token = nextCookies.get("next-auth.session-token");
	const task = await fetchSingleTask({
		token: token?.value,
		taskId: params.taskId ?? "",
	});

	if (!task) return notFound();

	return (
		<div className="mt-16 p-8">
			<p>Task ID: {task.id}</p>
			<p data-testid="title-dynamic-segment">Title: {task.title}</p>
			<p>Status: {task.completed ? "done" : "not yet"}</p>
			<p>Created at: {task && format(new Date(task.createdAt), "yyyy-MM-dd HH:mm:ss")}</p>
		</div>
	);
};

export default TaskDetailPage;
