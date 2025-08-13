import React, { useState } from "react";
import { Star } from "lucide-react";

const STAR_COUNT = 10;

interface StarSliderProps {
	className?: string;
	defaultValue?: number;
	value?: number;
	onValueChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
}

function StarSlider({
	className = "w-full",
	defaultValue = 0,
	value,
	onValueChange,
	min = 0,
	max = STAR_COUNT,
	step = 0.1,
}: StarSliderProps) {
	const [internalValue, setInternalValue] = useState(defaultValue);

	const currentValue = value !== undefined ? value : internalValue;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseFloat(e.target.value);
		if (onValueChange) {
			onValueChange(val);
		} else {
			setInternalValue(val);
		}
	};

	return (
		<div className={`relative w-full h-12 mb-2 ${className}`}>
			<div
				id="stars"
				className="absolute w-full pb-1 left-0 top-0 right-0 flex gap-0 px-2 justify-center pointer-events-none z-0"
			>
				{Array.from({ length: STAR_COUNT }).map((_, i) => {
					const fillPercentage = Math.round(
						Math.min(1, Math.max(0, currentValue - i)) * 100
					);

					return (
						<div
							key={i}
							className={`relative w-[${
								100 / STAR_COUNT
							}%] aspect-square flex-shrink-0`}
						>
							<Star
								className="top-0 right-0 absolute w-full h-full text-gray-300"
								// style={{
								// 	position: "absolute",
								// 	top: 0,
								// 	left: 0,
								// 	width: "100%",
								// 	height: "100%",
								// 	color: "#d1d5db",
								// }}
							/>

							<div
								className="absolute top-0 left-0 w-full h-8/12"
								style={{
									height: "100%",
									background: `linear-gradient(to right, #facc15 ${fillPercentage}%, transparent ${fillPercentage}%)`,
									WebkitMaskImage:
										'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc3Rhci1pY29uIGx1Y2lkZS1zdGFyIj48cGF0aCBkPSJNMTEuNTI1IDIuMjk1YS41My41MyAwIDAgMSAuOTUgMGwyLjMxIDQuNjc5YTIuMTIgMi4xMiAwIDAgMCAxLjU5NSAxLjE2bDUuMTY2Ljc1NmEuNTMuNTMgMCAwIDEgLjI5NC45MDRsLTMuNzM2IDMuNjM4YTIuMTIgMi4xMiAwIDAgMC0uNjExIDEuODc4bC44ODIgNS4xNGEuNTMuNTMgMCAwIDEtLjc3MS41NmwtNC42MTgtMi40MjhhMi4xMiAyLjEyIDAgMCAwLTEuOTczIDBMNi4zOTYgMjEuMDFhLjUzLjUzIDAgMCAxLS43Ny0uNTZsLjg4MS01LjEzOWEyLjEyIDIuMTIgMCAwIDAtLjYxLTEuODc5TDIuMTYgOS43OTVhLjUzLjUzIDAgMCAxIC4yOTQtLjkwNmw1LjE2NS0uNzU1YTIuMTIgMi4xMiAwIDAgMCAxLjU5Ny0xLjE2eiIvPjwvc3ZnPg==")',
									WebkitMaskRepeat: "no-repeat",
									WebkitMaskSize: "cover",
									maskImage:
										'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc3Rhci1pY29uIGx1Y2lkZS1zdGFyIj48cGF0aCBkPSJNMTEuNTI1IDIuMjk1YS41My41MyAwIDAgMSAuOTUgMGwyLjMxIDQuNjc5YTIuMTIgMi4xMiAwIDAgMCAxLjU5NSAxLjE2bDUuMTY2Ljc1NmEuNTMuNTMgMCAwIDEgLjI5NC45MDRsLTMuNzM2IDMuNjM4YTIuMTIgMi4xMiAwIDAgMC0uNjExIDEuODc4bC44ODIgNS4xNGEuNTMuNTMgMCAwIDEtLjc3MS41NmwtNC42MTgtMi40MjhhMi4xMiAyLjEyIDAgMCAwLTEuOTczIDBMNi4zOTYgMjEuMDFhLjUzLjUzIDAgMCAxLS43Ny0uNTZsLjg4MS01LjEzOWEyLjEyIDIuMTIgMCAwIDAtLjYxLTEuODc5TDIuMTYgOS43OTVhLjUzLjUzIDAgMCAxIC4yOTQtLjkwNmw1LjE2NS0uNzU1YTIuMTIgMi4xMiAwIDAgMCAxLjU5Ny0xLjE2eiIvPjwvc3ZnPg==")',
									maskRepeat: "no-repeat",
									maskSize: "cover",
								}}
							/>
						</div>
					);
				})}
			</div>

			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={currentValue}
				onChange={handleChange}
				className="absolute top-0 left-0 w-full h-[125%] opacity-0 cursor-pointer z-10"
				style={{ WebkitAppearance: "none" }}
			/>
		</div>
	);
}

export { StarSlider };
