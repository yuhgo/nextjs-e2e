import { Spinner } from "@/app/_component/spinner";
import { TaskEdit } from "@/app/_component/task-edit";
import { TaskList } from "@/app/_component/task-list";
import { type FC, type PropsWithChildren, Suspense } from "react";

const TaskCrudLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<section className="flex">
			<aside className={"h-[calc(100vh-64px)] w-1/4 bg-gray-200"}>
				<TaskEdit />
				<Suspense fallback={<Spinner />}>
					<TaskList />
				</Suspense>
			</aside>
			<main className="flex-1 flex justify-center">{children}</main>
		</section>
	);
};

export default TaskCrudLayout;
