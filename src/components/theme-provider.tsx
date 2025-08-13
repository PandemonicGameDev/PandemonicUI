import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light");

	// Load saved theme or system preference
	useEffect(() => {
		const saved = localStorage.getItem("theme") as Theme | null;
		if (saved) {
			setTheme(saved);
			document.documentElement.classList.toggle("dark", saved === "dark");
		} else {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			setTheme(prefersDark ? "dark" : "light");
			document.documentElement.classList.toggle("dark", prefersDark);
		}
	}, []);

	// Toggle theme and save
	const toggleTheme = () => {
		const newTheme: Theme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
	return ctx;
}
