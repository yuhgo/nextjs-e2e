import { prisma } from "@/_lib/prisma";
import type { CreateTaskInput, TaskId, UpdateTaskInput } from "schema/task";

export const getTasks = async (userId: string) => {
	try {
		const tasks = await prisma.task.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		return { tasks };
	} catch (error) {
		return { error };
	}
};

export const createTask = async (task: CreateTaskInput, userId: string) => {
	try {
		const createdTask = await prisma.task.create({
			data: {
				...task,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return { task: createdTask };
	} catch (error) {
		return { error };
	}
};

export const getTaskById = async ({ taskId }: TaskId) => {
	try {
		const task = await prisma.task.findUnique({
			where: {
				id: taskId,
			},
		});

		return { task };
	} catch (error) {
		return { error };
	}
};

export const deleteTask = async ({ taskId }: TaskId) => {
	try {
		const task = await prisma.task.delete({
			where: {
				id: taskId,
			},
		});

		return { task };
	} catch (error) {
		return { error };
	}
};

export const updateTask = async (task: UpdateTaskInput, { taskId }: TaskId) => {
	try {
		const updatedTask = await prisma.task.update({
			where: {
				id: taskId,
			},
			data: {
				...task,
			},
		});

		return { task: updatedTask };
	} catch (error) {
		return { error };
	}
};
