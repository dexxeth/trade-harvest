"use client";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/app/data/items";

interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

export default function Component() {
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{
			id: 1,
			name: "Apple 25kg",
			price: 6500.0,
			quantity: 1,
			image: "/images/apple.jpeg?height=80&width=80",
		},
		{
			id: 2,
			name: "Wheat",
			price: 2310.0,
			quantity: 2,
			image: "/images/wheat.jpg?height=80&width=80",
		},
		{
			id: 3,
			name: "Corn",
			price: 5350.0,
			quantity: 1,
			image: "/images/corn.jpg?height=80&width=80",
		},
	]);

	const updateQuantity = (id: number, change: number) => {
		setCartItems((items) =>
			items
				.map((item) =>
					item.id === id
						? {
								...item,
								quantity: Math.max(0, item.quantity + change),
						  }
						: item
				)
				.filter((item) => item.quantity > 0)
		);
	};

	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className="bg-gray-100 min-h-screen flex flex-col max-w-md mx-auto">
			<header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
				<h1 className="text-xl font-bold text-center">Your Cart</h1>
			</header>

			<main className="flex-grow p-4 space-y-4">
				{cartItems.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
						<img
							src={item.image}
							alt={item.name}
							className="w-20 h-20 object-cover rounded"
						/>
						<div className="flex-grow">
							<h2 className="font-semibold">{item.name}</h2>
							<p className="text-gray-600">
								₹{item.price.toFixed(2)}
							</p>
							<div className="flex items-center space-x-2 mt-2">
								<Button
									onClick={() => updateQuantity(item.id, -1)}
									className="p-2 rounded-full">
									<Minus className="w-4 h-4" />
								</Button>
								<span>{item.quantity}</span>
								<Button
									onClick={() => updateQuantity(item.id, 1)}
									className="rounded-full">
									<Plus className="w-4 h-4" />
								</Button>
							</div>
						</div>
					</div>
				))}
			</main>

			<footer className="bg-white shadow-lg p-4 sticky bottom-12">
				<div className="flex justify-between items-center mb-4">
					<span className="font-semibold">Total:</span>
					<span className="font-bold text-xl">
						₹{total.toFixed(2)}
					</span>
				</div>
				<Button className="w-full py-3 text-lg" size="lg">
					<ShoppingBag className="mr-2 h-5 w-5" /> Checkout
				</Button>
			</footer>
		</div>
	);
}
