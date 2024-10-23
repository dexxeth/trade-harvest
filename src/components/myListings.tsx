"use client";
import { useState } from "react";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Listing {
	id: string;
	name: string;
	category: "Fruit" | "Crop";
	price: number;
	quantity: number;
	image: string;
	status: "Active" | "Sold Out" | "Paused";
}

const listings: Listing[] = [
	{
		id: "LST001",
		name: "Fresh Apples",
		category: "Fruit",
		price: 4000,
		quantity: 5,
		image: "/placeholder.svg?height=100&width=100",
		status: "Active",
	},
	{
		id: "LST002",
		name: "Organic Wheat",
		category: "Crop",
		price: 2500,
		quantity: 10,
		image: "/placeholder.svg?height=100&width=100",
		status: "Active",
	},
	{
		id: "LST003",
		name: "Ripe Mangoes",
		category: "Fruit",
		price: 6000,
		quantity: 3,
		image: "/placeholder.svg?height=100&width=100",
		status: "Sold Out",
	},
	{
		id: "LST004",
		name: "Basmati Rice",
		category: "Crop",
		price: 7500,
		quantity: 8,
		image: "/placeholder.svg?height=100&width=100",
		status: "Paused",
	},
];

export default function MyListings() {
	const [filter, setFilter] = useState<string>("all");

	const filteredListings =
		filter === "all"
			? listings
			: listings.filter(
					(listing) =>
						listing.status.toLowerCase() === filter.toLowerCase()
			  );

	const getStatusColor = (status: Listing["status"]) => {
		switch (status) {
			case "Active":
				return "bg-green-100 text-green-800";
			case "Sold Out":
				return "bg-red-100 text-red-800";
			case "Paused":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen flex flex-col max-w-md mx-auto">
			<header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10 flex items-center">
				<Button variant="ghost" size="icon" className="mr-2">
					<ArrowLeft className="h-6 w-6" />
				</Button>
				<h1 className="text-xl font-bold flex-grow">My Listings</h1>
				<Button size="icon" variant="ghost">
					<Plus className="h-6 w-6" />
				</Button>
			</header>

			<main className="flex-grow p-4 space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold">Your Products</h2>
					<Select onValueChange={setFilter} defaultValue={filter}>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Filter listings" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Listings</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="sold out">Sold Out</SelectItem>
							<SelectItem value="paused">Paused</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-4">
					{filteredListings.map((listing) => (
						<div
							key={listing.id}
							className="bg-white rounded-lg shadow p-4 space-y-3">
							<div className="flex items-start space-x-4">
								<Avatar className="h-16 w-16 rounded-md">
									<AvatarImage
										src={listing.image}
										alt={listing.name}
									/>
									<AvatarFallback>
										{listing.name[0]}
									</AvatarFallback>
								</Avatar>
								<div className="flex-grow">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-semibold">
												{listing.name}
											</h3>
											<p className="text-sm text-gray-500">
												{listing.category}
											</p>
										</div>
										<Badge
											variant="secondary"
											className={getStatusColor(
												listing.status
											)}>
											{listing.status}
										</Badge>
									</div>
									<div className="mt-2 flex justify-between items-center">
										<p className="font-medium">
											₹
											{listing.price.toLocaleString(
												"en-IN"
											)}
											/quintal
										</p>
										<p className="text-sm text-gray-600">
											{listing.quantity} quintals
											available
										</p>
									</div>
								</div>
							</div>
							<div className="flex justify-between pt-2 border-t mb-8">
								<Button
									variant="outline"
									size="sm"
									className="w-[48%]">
									<Edit className="h-4 w-4 mr-2" />
									Edit
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="w-[48%]">
									<Trash2 className="h-4 w-4 mr-2" />
									Delete
								</Button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
