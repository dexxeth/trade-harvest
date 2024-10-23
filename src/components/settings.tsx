import {
	ChevronRight,
	Globe,
	HeadphonesIcon,
	ListIcon,
	ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
	const menuItems = [
		{
			icon: ShoppingBag,
			label: "Orders",
			href: "/profile/orders",
		},
		{ icon: ListIcon, label: "My Listings", href: "/profile/myListings" },
		{ icon: Globe, label: "Language", href: "/language" },
		{ icon: HeadphonesIcon, label: "Customer Support", href: "/support" },
	];

	return (
		<div className="min-h-screen flex flex-col max-w-md mx-auto">
			<main className="flex-grow px-4">
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
										className="flex items-center p-4">
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
		</div>
	);
}
