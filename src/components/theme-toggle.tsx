import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="cursor-pointer hover:bg-accent m-2 p-2 border transition-all rounded bg-background text-foreground"
		>
			{theme === "dark" ? <Sun /> : <Moon />}
		</button>
	);
}
