"use client";
import { useState } from "react";
import { ArrowLeft, ChevronRight, Package } from "lucide-react";
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

interface Order {
	id: string;
	date: string;
	status: "Delivered" | "In Transit" | "Processing";
	total: number;
	items: { name: string; quantity: string }[];
}

const orders: Order[] = [
	{
		id: "ORD001",
		date: "2024-10-15",
		status: "Delivered",
		total: 5350,
		items: [
			{ name: "Corn", quantity: "1 Quintal" },
		],
	},
	{
		id: "ORD002",
		date: "2024-10-20",
		status: "In Transit",
		total: 65000.00,
		items: [{ name: "Apple", quantity: "10 Quintal",  }],
	},
	{
		id: "ORD003",
		date: "2024-10-22",
		status: "Processing",
		total: 23100.00,
		items: [{ name: "Wheat", quantity: "10 Quintal" }],
	},
];

export default function Component() {
	const [filter, setFilter] = useState<string>("all");

	const filteredOrders =
		filter === "all"
			? orders
			: orders.filter((order) => order.status.toLowerCase() === filter);

	const getStatusColor = (status: Order["status"]) => {
		switch (status) {
			case "Delivered":
				return "bg-green-100 text-green-800";
			case "In Transit":
				return "bg-blue-100 text-blue-800";
			case "Processing":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen flex flex-col max-w-md mx-auto">
			<header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10 flex items-center">
				<Button variant="ghost" size="icon" className="mr-2">
					<ArrowLeft className="h-6 w-6" href="/profile" />
				</Button>
				<h1 className="text-xl font-bold flex-grow">My Orders</h1>
			</header>

			<main className="flex-grow p-4 space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold">Order History</h2>
					<Select onValueChange={setFilter} defaultValue={filter}>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Filter orders" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Orders</SelectItem>
							<SelectItem value="delivered">Delivered</SelectItem>
							<SelectItem value="in transit">
								In Transit
							</SelectItem>
							<SelectItem value="processing">
								Processing
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-4">
					{filteredOrders.map((order) => (
						<div
							key={order.id}
							className="bg-white rounded-lg shadow p-4 space-y-3">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-semibold">
										Order #{order.id}
									</h3>
									<p className="text-sm text-gray-500">
										{order.date}
									</p>
								</div>
								<Badge
									variant="secondary"
									className={getStatusColor(order.status)}>
									{order.status}
								</Badge>
							</div>
							<div className="flex items-center space-x-3">
								<Avatar className="h-10 w-10">
									<AvatarImage
										src="/placeholder.svg?height=40&width=40"
										alt="Product"
									/>
									<AvatarFallback>
										<Package className="h-5 w-5" />
									</AvatarFallback>
								</Avatar>
								<div className="flex-grow">
									<p className="font-medium">
										{order.items[0].name}
									</p>
									<p className="text-sm text-gray-500">
										{order.items.length > 1
											? `+${
													order.items.length - 1
											  } more item${
													order.items.length > 2
														? "s"
														: ""
											  }`
											: `Qty: ${order.items[0].quantity}`}
									</p>
								</div>
								<p className="font-semibold">
								₹{order.total.toFixed(2)}
								</p>
							</div>
							<Button
								variant="ghost"
								className="w-full justify-between"
								asChild>
								<a href={`/order/${order.id}`}>
									View Order Details
									<ChevronRight className="h-5 w-5" />
								</a>
							</Button>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
