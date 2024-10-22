import Link from "next/link";
import Image from "next/image";
import { Bell, MessageCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Component() {
	return (
		<nav className="top-0 sticky w-full z-50 bg-white shadow-sm">
			<div className="container mx-auto px-4 flex items-center justify-between h-12">
				<Link href="/" className="flex items-center">
					<Image
						src="/images/logo.png"
						alt="Logo"
						width={44}
						height={44}
						className="mr-2"
					/>
					<span className="text-xl font-bold text-primary">
						Trade Harvest
					</span>
				</Link>

				<div className="flex items-center space-x-4">
					<Link href="/cart">
						<Button
							variant="ghost"
							size="icon"
							aria-label="Notifications">
							<ShoppingCart className="h-6 w-6" />
						</Button>
					</Link>

					<Button
						variant="ghost"
						size="icon"
						aria-label="Notifications">
						<Bell className="h-6 w-6" />
					</Button>

					<Link href="/messaging">
						<Button
							variant="ghost"
							size="icon"
							aria-label="Messages">
							<MessageCircle className="h-6 w-6" />
						</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
