import { API_URL } from "@/_lib/const";
import { TaskItem } from "@/app/_component/task-item";
import type { Task } from "@prisma/client";
import { cookies } from "next/headers";

const fetchTasks = async (token?: string) => {
	const url = `${API_URL}/tasks`;
	const res = await fetch(url, {
		headers: {
			cookie: `next-auth.session-token=${token}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data in server");
	}

	return (await res.json()) as Task[];
};

export const TaskList = async () => {
	const nextCookies = cookies();
	const token = nextCookies.get("next-auth.session-token");
	const tasks = await fetchTasks(token?.value);

	return (
		<ul className="mx-3 my-6">
			{tasks.map((task) => {
				return <TaskItem key={task.id} task={task} />;
			})}
		</ul>
	);
};
