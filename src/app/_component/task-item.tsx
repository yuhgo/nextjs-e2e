"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Task } from "@prisma/client";
import type { FC } from "react";

import { CLIENT_API_URL } from "@/_lib/const";
import { useStore } from "@/app/store";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

type Props = {
	task: Task;
};

export const TaskItem: FC<Props> = (props) => {
	const { task } = props;

	const router = useRouter();
	const updateEditedTask = useStore((state) => state.updateEditedTask);
	const resetEditedTask = useStore((state) => state.resetEditedTask);

	const handleUpdateTask = async (data: { id: string; completed: boolean }) => {
		const url = `${CLIENT_API_URL}/tasks/${data.id}`;
		await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ completed: data.completed }),
		});
		router.refresh();
		resetEditedTask();
	};

	const handleDeleteTask = async (id: string) => {
		const url = `${CLIENT_API_URL}/tasks/${id}`;
		await fetch(url, {
			method: "DELETE",
		});
		router.refresh();
	};

	return (
		<li className="my-2">
			<input
				className="mr-1"
				type="checkbox"
				checked={task.completed}
				onChange={() => handleUpdateTask({ id: task.id, completed: !task.completed })}
			/>
			<Link href={`/task-crud/${task.id}`}>{task.title}</Link>
			<div className="float-right ml-20 flex">
				<PencilIcon
					data-testid="task-edit-icon"
					className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
					onClick={() => {
						updateEditedTask({
							id: task.id,
							title: task.title,
							completed: task.completed,
						});
					}}
				/>
				<TrashIcon
					data-testid="task-delete-icon"
					className="h-5 w-5 cursor-pointer text-blue-500"
					onClick={() => handleDeleteTask(task.id)}
				/>
			</div>
		</li>
	);
};
