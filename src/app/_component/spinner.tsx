import type { FC } from "react";

type SpinnerProps = {
	color?: string;
	width?: string;
	height?: string;
};

export const Spinner: FC<SpinnerProps> = (props) => {
	const { color = "border-blue-500", width = "w-5", height = "h-5" } = props;

	return (
		<div className="m-2 flex justify-center">
			<div className={`${height} ${width} animate-spin rounded-full border-2 ${color} border-t-transparent`} />
		</div>
	);
};
