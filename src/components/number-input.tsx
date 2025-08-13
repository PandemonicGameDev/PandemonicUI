import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type TailwindWidth =
	| "0"
	| "px"
	| "full"
	| "screen"
	| "auto"
	| "min"
	| "max"
	| "min-content"
	| "max-content"
	| `${number}`
	| `${number}/${number}`
	| `${number}px`
	| `${number}rem`
	| `${number}%`;

interface NumberInputProps {
	value: number;
	onChange: (value: number) => void;
	className?: string;
	width?: TailwindWidth;
	min?: number;
	max?: number;
	step?: number;
	base?: number;
	showBase?: boolean;
	formatMode?: "normal" | "scientific";
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
}

("px-2 h-full py-1 border hover:bg-gray-100 transition-colors select-none cursor-pointer disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent");

const buttonVariants = {
	primary: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
	secondary:
		"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
	outline:
		"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
	ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
	danger: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
};

export default function NumberInput({
	value,
	onChange,
	width,
	max,
	min,
	step = 1,
	base = 10,
	showBase = true,
	formatMode = "normal",
	variant = "primary",
}: NumberInputProps) {
	const [localValue, setLocalValue] = useState("");

	useEffect(() => {
		if (formatMode === "scientific") {
			setLocalValue(value.toExponential());
		} else {
			setLocalValue(value.toString(base).toUpperCase());
		}
	}, [value, base, formatMode]);

	const normalizeNumber = (num: number) => {
		let newValue = num;
		if (max !== undefined && newValue > max) newValue = max;
		if (min !== undefined && newValue < min) newValue = min;
		return newValue;
	};

	const formatValue = (num: number) => {
		if (formatMode === "scientific") {
			return num.toExponential();
		} else {
			return num.toString(base).toUpperCase();
		}
	};

	const decrement = () => {
		const newVal = normalizeNumber(value - step);
		onChange(newVal);
	};

	const increment = () => {
		const newVal = normalizeNumber(value + step);
		onChange(newVal);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value.toUpperCase();

		if (formatMode === "scientific") {
			val = val.replace(/[^0-9E.+-]/g, "");

			if (val === "") {
				setLocalValue("");
				onChange(min ?? 0);
				return;
			}

			const parsed = Number(val);
			if (!isNaN(parsed)) {
				const newValue = normalizeNumber(parsed);
				setLocalValue(formatValue(newValue));
				onChange(newValue);
			} else {
				setLocalValue(val);
			}
		} else {
			const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(
				0,
				base
			);
			const regex = new RegExp(`[^${validChars}]`, "g");
			val = val.replace(regex, "");
			val = val.replace(/^0+(?=[1-9A-Z])/, "");

			if (val === "") {
				setLocalValue("");
				onChange(min ?? 0);
				return;
			}

			const parsed = parseInt(val, base);
			if (!isNaN(parsed)) {
				const newValue = normalizeNumber(parsed);
				setLocalValue(formatValue(newValue));
				onChange(newValue);
			} else {
				setLocalValue(val);
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			increment();
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			decrement();
		}
	};

	const baseButtonClass =
		"px-2 h-full py-1 border rounded-md hover:bg-gray-100 transition-colors select-none cursor-pointer disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent";

	const buttonClasses = twMerge(baseButtonClass, buttonVariants[variant]);

	const inputWrapperClasses = `relative flex items-center ${
		width
			? /px$|rem$|%$/.test(width)
				? `w-[${width}]`
				: `w-${width}`
			: "w-full"
	}`;

	const baseInputClass =
		"text-center w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 hide-arrows";

	const inputClasses = twMerge(
		baseInputClass,
		"bg-background text-foreground active:border-ring"
	);
	console.log(inputClasses);

	const suffixClasses =
		"absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs select-none pointer-events-none";

	return (
		<>
			<div className={`flex items-center gap-2`}>
				<button
					disabled={min !== undefined && value <= min}
					aria-label="Decrease value"
					onClick={decrement}
					className={buttonClasses}
					tabIndex={0}
				>
					<Minus className="w-4" />
				</button>

				<div className={inputWrapperClasses}>
					<input
						onKeyDown={handleKeyDown}
						aria-label="Number input"
						type="text"
						value={localValue.replace(
							formatMode === "scientific" ? "+" : "",
							""
						)}
						onChange={handleChange}
						className={inputClasses}
					/>
					{showBase && formatMode === "normal" && (
						<span
							className={suffixClasses}
							style={{ fontSize: "0.65em", fontWeight: "normal" }}
						>
							base {base}
						</span>
					)}
				</div>

				<button
					disabled={max !== undefined && value >= max}
					aria-label="Increase value"
					onClick={increment}
					className={buttonClasses}
					tabIndex={0}
				>
					<Plus className="w-4" />
				</button>
			</div>
			<style>
				{`
					.hide-arrows::-webkit-inner-spin-button,
					.hide-arrows::-webkit-outer-spin-button {
						-webkit-appearance: none;
						margin: 0;
					}
					.hide-arrows {
						-moz-appearance: textfield;
					}
				`}
			</style>
		</>
	);
}
