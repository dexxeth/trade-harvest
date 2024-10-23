"use client";

import { useState } from "react";
import { useProducts } from "@/components/ProductsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function Component() {
	const { addProduct } = useProducts();
	const [date, setDate] = useState<Date>();
	const router = useRouter();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		const newProduct = {
			id: Date.now(),
			name: formData.get("title") as string,
			price: parseFloat(formData.get("price") as string),
			image: "/images/corn.jpg", // Replace with actual image handling logic
			location: formData.get("location") as string,
			uploadTime: date || new Date(),
			description: formData.get("description") as string,
			rating: 4.5,
			images: [], // Add your image handling logic here
			reviews: [],
		};

		addProduct(newProduct);
		router.push(`/${newProduct.id}`); // Redirect to the products page after submission
	};

	return (
		<div className="min-h-screen p-4">
			<form
				onSubmit={handleSubmit}
				className="space-y-4 p-6 rounded-lg shadow-md bg-white">
				<h1 className="text-2xl font-bold text-center">
					Upload Product
				</h1>

				<div className="space-y-2">
					<Label htmlFor="title">Product Name</Label>
					<Input
						id="title"
						name="title"
						placeholder="Enter product title"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Product Description</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="Enter product description"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label>Date</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-full justify-start text-left font-normal",
									!date && "text-muted-foreground"
								)}>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? (
									format(date, "PPP")
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>

				<div className="space-y-2">
					<Label htmlFor="location">Location</Label>
					<Input
						id="location"
						name="location"
						placeholder="Enter product location"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="images">Images</Label>
					<Input
						id="images"
						name="images"
						type="file"
						multiple
						accept="image/*"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="price">Price</Label>
					<Input
						id="price"
						name="price"
						type="number"
						placeholder="Enter product price"
						required
					/>
				</div>

				<Button type="submit" className="w-full bg-blue-600">
					Upload Product
				</Button>
			</form>
		</div>
	);
}
