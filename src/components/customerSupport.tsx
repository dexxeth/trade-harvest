import {
	ChevronRight,
	Globe,
	HeadphonesIcon,
	ListIcon,
	ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerSupport() {
	const menuItems = [
		{ icon: HeadphonesIcon, label: "Customer Support", href: "/support" },
	];

	return (
		<main className="px-4 py-2">
			<nav className="bg-white rounded-lg shadow">
				<ul className="divide-y divide-gray-200">
					{menuItems.map((item, index) => (
						<li key={index}>
							<Button
								variant="ghost"
								className="w-full justify-start py-4 px-4 hover:bg-gray-50"
								asChild>
								<a
									href={item.href}
									className="flex items-center">
									<item.icon
										className="h-5 w-5 mr-3 text-gray-500"
										aria-hidden="true"
									/>
									<span className="flex-grow text-left">
										{item.label}
									</span>
									<ChevronRight
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</a>
							</Button>
						</li>
					))}
				</ul>
			</nav>
		</main>
	);
}
