"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Clock } from "lucide-react";
import { products } from "@/app/data/items";
import { Input } from "@/components/ui/input";

function formatRelativeTime(date: Date) {
	return formatDistanceToNow(date, { addSuffix: true });
}

export default function ProductListPage() {
	const router = useRouter();

	const handleClick = (id: number) => {
		router.push(`/${id}`);
	};

	return (
		<div className="min-h-screen container mx-auto mb-16 px-4">
			<form className="sticky top-2">
				<Input
					type="text"
					placeholder="Search product"
					className=" bg-white shadow-md my-4 p-2 rounded-full"
				/>
			</form>
			<h1 className="text-2xl font-bold mb-6 overflow-hidden">
				Products
			</h1>
			<div className="grid grid-cols-2 gap-4">
				{products.map((product) => (
					<Card
						key={product.id}
						className="overflow-hidden cursor-pointer"
						onClick={() => handleClick(product.id)}>
						<Image
							src={product.image}
							alt={product.name}
							width={200}
							height={180}
							className="w-full h-32 object-cover"
						/>
						<CardContent className="p-3">
							<h2 className="font-semibold text-sm mb-1 truncate">
								{product.name}
							</h2>
							<p className="text-primary font-bold mb-2">
								₹{product.price.toFixed(2)}
							</p>
							<div className="flex items-center text-xs text-muted-foreground mb-1">
								<MapPin className="w-3 h-3 mr-1" />
								<span className="truncate">
									{product.location}
								</span>
							</div>
							<div className="flex items-center text-xs text-muted-foreground">
								<Clock className="w-3 h-3 mr-1" />
								<span>
									{formatRelativeTime(product.uploadTime)}
								</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
