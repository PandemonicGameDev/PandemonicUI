import React from "react";
import { twMerge } from "tailwind-merge";

export default function GridBordered({
	children,
	width = "w-full",
	childClass = "",
	className = "",
}: {
	children: React.ReactNode;
	width?: string;
	childClass?: string;
	className?: string;
}) {
	return (
		<div
			className={twMerge(
				`flex flex-col mx-auto h-full gap-4 p-10 ${width}`,
				className
			)}
		>
			{React.Children.map(children, (child, i) => (
				<div
					key={i}
					className={twMerge(
						"border border-foreground border-dashed rounded-md p-2",
						childClass
					)}
				>
					{child}
				</div>
			))}
		</div>
	);
}
