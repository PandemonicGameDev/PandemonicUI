import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
	wrapperWidth?: string; // e.g., "w-64", "w-full", "max-w-sm"
}

const baseInputStyles =
	"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

function Input({
	className,
	type,
	wrapperWidth = "w-full",
	...props
}: InputProps) {
	const inputElement = (
		<input
			type={type}
			className={cn(
				baseInputStyles,
				type === "file" &&
					"absolute inset-0 opacity-0 z-10 h-9 rounded-md cursor-pointer",
				className
			)}
			{...props}
		/>
	);

	if (type === "file") {
		return (
			<div className={cn("relative group", wrapperWidth)}>
				{inputElement}
				<div className="pointer-events-none flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm text-muted-foreground shadow-xs">
					<span>Select a file…</span>
					<span className="text-xs text-gray-400">Max 10KB</span>
				</div>
			</div>
		);
	}

	return inputElement;
}

export { Input };
