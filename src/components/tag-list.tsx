import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

export default function TagList({
	gap = 2,
	tags = [],
	isAdmin = false,
	searchTerm = "filter",
	center = false,
}: {
	gap?: number;
	tags?: string[];
	isAdmin?: boolean;
	searchTerm?: string;
	center?: boolean;
}) {
	const navigate = useNavigate();
	return (
		<div
			className={`flex flex-wrap hover: gap-${gap.toString()} ${
				center ? " justify-center sm:justify-start" : ""
			}`}
		>
			{tags.map((tag: string, index: number) => (
				// <Link to={}
				<Badge
					onClick={() => {
						navigate(
							`${
								isAdmin
									? `/admin/?${searchTerm}=${tag}`
									: `/?${searchTerm}=${tag}`
							}`
						);
					}}
					key={index}
					variant="outline"
					className="text-xs px-2 py-0.5 hover:scale-105 transition-transform hover:bg-gray-100 cursor-pointer"
				>
					{tag}
				</Badge>
			))}
		</div>
	);
}
