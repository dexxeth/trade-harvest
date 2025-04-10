"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { State, City } from "country-state-city";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

export default function UploadProduct() {
	const router = useRouter();
	const [images, setImages] = useState<File[]>([]);
	const [selectedState, setSelectedState] = useState<string>("");
	const [selectedCity, setSelectedCity] = useState<string>("");
	const [states, setStates] = useState<any[]>([]);
	const [cities, setCities] = useState<any[]>([]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImages(Array.from(e.target.files));
		}
	};

	useEffect(() => {
		const indianStates = State.getStatesOfCountry("IN");
		setStates(indianStates);
	}, []);

	useEffect(() => {
		// When state changes, load cities
		if (selectedState) {
			const citiesList = City.getCitiesOfState("IN", selectedState);
			setCities(citiesList);
		}else{
            setCities([]);
        }
	}, [selectedState]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const newProduct = {
			id: Date.now(),
			name: formData.get("title") as string,
			category: formData.get("category") as string,
			description: formData.get("description") as string,
			quantity: formData.get("quantity") as string,
			price: parseFloat(formData.get("price") as string),
			image: images.length ? URL.createObjectURL(images[0]) : "", // Just for preview purposes
			images: images.map((file) => file.name), // filenames only
			location: `${formData.get("city")}, ${formData.get("state")}`,
			uploadTime: new Date(),
			rating: 4.5,
			reviews: [],
		};

		try {
			const response = await fetch("/api/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newProduct),
			});

			if (response.ok) {
				router.push("/shopping");
			} else {
				console.error("Failed to upload product");
			}
		} catch (error) {
			console.error("Error while uploading product:", error);
		}
	};

	return (
		<div className="min-h-screen p-4">
			<form
				onSubmit={handleSubmit}
				className="space-y-4 p-6 bg-white shadow rounded">
				<h2 className="text-xl font-semibold text-center">
					Upload Product
				</h2>

				{/* Product Name */}
				<div>
					<Label htmlFor="title">Product Name</Label>
					<Input
						id="title"
						name="title"
						placeholder="e.g., Wheat"
						required
					/>
				</div>

				{/* Category Dropdown */}
				<div>
					<Label htmlFor="category">Category</Label>
					{/* <select
						id="category"
						name="category"
						required
						className="w-full border rounded p-2">
						<option value="">Select Category</option>
						<option value="Grains">Grains</option>
						<option value="Vegetables">Vegetables</option>
						<option value="Fruits">Fruits</option>
						<option value="Pulses">Pulses</option>
						<option value="Others">Others</option>
					</select> */}
				</div>

				{/* Description */}
				<div>
					<Label htmlFor="description">Product Description</Label>
					<Textarea
						id="description"
						name="description"
						required
						className="resize-none"
					/>
				</div>

				{/* Quantity */}
				<div>
					<Label htmlFor="quantity">Quantity (in Quintals)</Label>
					<Input
						id="quantity"
						name="quantity"
						type="number"
						min="1"
						required
					/>
				</div>

				{/* State Dropdown */}
				<div className="space-y-2">
					<Label>State</Label>
					<Select onValueChange={setSelectedState} required>
						<SelectTrigger>
							<SelectValue placeholder="Select a state" />
						</SelectTrigger>
						<SelectContent>
							{states.map((state) => (
								<SelectItem key={state.isoCode} value={state.isoCode}>
									{state.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* City Dropdown */}
				<div className="space-y-2">
					<Label>City</Label>
					<Select onValueChange={setSelectedCity} required>
						<SelectTrigger>
							<SelectValue placeholder="Select a city" />
						</SelectTrigger>
						<SelectContent>
							{cities.map((city) => (
								<SelectItem key={city.name} value={city.name}>
									{city.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Images */}
				<div>
					<Label htmlFor="images">Product Images</Label>
					<Input
						id="images"
						name="images"
						type="file"
						multiple
						accept="image/*"
						onChange={handleImageChange}
						required
					/>
				</div>

				{/* Unit Price */}
				<div>
					<Label htmlFor="price">Unit Price (₹/quintal)</Label>
					<Input
						id="price"
						name="price"
						type="number"
						min="1"
						required
					/>
				</div>

				<Button
					type="submit"
					className="w-full bg-green-600 text-white hover:bg-green-700">
					Upload Product
				</Button>
			</form>
		</div>
	);
}
