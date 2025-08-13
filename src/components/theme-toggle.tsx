import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="p-2 border rounded bg-background text-foreground"
		>
			{theme === "dark" ? <Sun /> : <Moon />}
		</button>
	);
}
