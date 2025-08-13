import { useState } from "react";
import "./App.css";
import GridBordered from "./components/grid-bordered";

import NumberInput from "./components/number-input";
import TagInput from "./components/tag-input";
import { StarSlider } from "./components/sliderStars";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";

function App() {
	const [count, setCount] = useState(0);
	const [stars, setStars] = useState(0);
	const [tags, setTags] = useState<string[]>([]);
	const numberInputBases = [10, 2, 16, 21, 36];

	return (
		<ThemeProvider>
			<ThemeToggle />
			<GridBordered width="w-7/8" childClass="p-10">
				<GridBordered className="p-0">
					{numberInputBases.map((base) => (
						<NumberInput
							key={base}
							value={count}
							base={base}
							showBase={true}
							onChange={(c) => {
								if (typeof c === "number") {
									setCount(c);
								}
							}}
						/>
					))}
				</GridBordered>

				<TagInput
					tags={["hello", "world", "random"]}
					value={tags}
					onChange={(t) => setTags(t)}
				/>
				<StarSlider value={stars} onValueChange={(v) => setStars(v)} />
			</GridBordered>
		</ThemeProvider>
	);
}

export default App;
