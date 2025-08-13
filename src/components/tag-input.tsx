import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	value: string[];
	onChange: (val: string[]) => void;
	tags?: string[];
	placeholder?: string;
	addNewToList?: boolean;
};

export default function TagInput({
	value,
	onChange,
	className,
	tags = [],
	placeholder = "Add a tag",
	addNewToList = true,
}: Props) {
	const [input, setInput] = useState("");
	const [custom, setCustom] = useState<string[]>([]);
	const [isFocused, setIsFocused] = useState(false);
	const [arrowIndex, setArrowIndex] = useState(0);
	const [arrowSelect, setArrowSelect] = useState(false);
	const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

	const options = [...new Set([...tags, ...custom])];
	let filteredOptions = options.filter(
		(opt) =>
			opt.toLowerCase().includes(input.toLowerCase()) &&
			!value.includes(opt)
	);

	useEffect(() => {
		filteredOptions = options.filter(
			(opt) =>
				opt.toLowerCase().includes(input.toLowerCase()) &&
				!value.includes(opt)
		);
	}, [custom]);

	useEffect(() => {
		if (isFocused && filteredOptions.length > 0) {
			const el = scrollRefs.current[arrowIndex];
			if (el) el.scrollIntoView({ block: "nearest" });
		}
	}, [arrowIndex, filteredOptions, isFocused]);

	function addTag(tag: string) {
		if (!tag.trim() || value.includes(tag)) return;
		onChange([...value, tag]);
		if (addNewToList && !tags.includes(tag)) {
			setCustom((c) => [...c, tag]);
		}
		setInput("");
		setArrowIndex(0);
		setArrowSelect(false);
	}

	function removeTag(tag: string) {
		onChange(value.filter((t) => t !== tag));
	}

	const setRef = (el: HTMLDivElement | null, i: number) => {
		scrollRefs.current[i] = el;
	};

	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			<div className="relative w-full">
				{isFocused && filteredOptions.length > 0 && (
					<div className="font-normal border p-[var(--spacing)] border-input absolute bottom-full mb-1 left-0 bg-background w-full rounded-md shadow-md z-10 max-h-40 overflow-y-auto">
						{(() => {
							scrollRefs.current = [];
							return filteredOptions.map((opt, i) => (
								<div
									key={opt}
									ref={(el) => setRef(el, i)}
									className={cn(
										"px-3 text-foreground py-2 cursor-pointer hover:bg-muted hover:text-accent-foreground",
										i === arrowIndex
											? "bg-accent"
											: "bg-background"
									)}
									onMouseDown={(e) => {
										e.preventDefault();
										addTag(opt);
									}}
								>
									{opt}
								</div>
							));
						})()}
					</div>
				)}

				<input
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
						setArrowIndex(0);
						setArrowSelect(false);
					}}
					onFocus={() => {
						setIsFocused(true);
						setArrowIndex(0);
						setArrowSelect(false);
					}}
					onBlur={() => setTimeout(() => setIsFocused(false), 150)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							const exactMatch =
								filteredOptions.length === 1 &&
								filteredOptions[0].toLowerCase() ===
									input.toLowerCase();

							if (exactMatch) addTag(filteredOptions[0]);
							else if (arrowSelect && filteredOptions[arrowIndex])
								addTag(filteredOptions[arrowIndex]);
							else addTag(input);
						}
						if (e.key === "ArrowUp") {
							e.preventDefault();
							setArrowSelect(true);
							setArrowIndex((i) =>
								i > 0 ? i - 1 : filteredOptions.length - 1
							);
						}
						if (e.key === "ArrowDown") {
							e.preventDefault();
							setArrowSelect(true);
							setArrowIndex((i) =>
								i < filteredOptions.length - 1 ? i + 1 : 0
							);
						}
						if (e.key === "Escape") {
							setArrowSelect(false);
							setArrowIndex(0);
						}
					}}
					placeholder={placeholder}
					className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
				/>
			</div>

			<div className="flex flex-wrap gap-2">
				{value.map((tag) => (
					<div
						key={tag}
						className="bg-muted px-3 py-1 rounded-full flex items-center gap-1 text-sm"
					>
						{tag}
						<button
							onClick={() => removeTag(tag)}
							type="button"
							aria-label={`Remove tag ${tag}`}
						>
							<X className="w-3 h-3" />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
