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
  const [date, setDate] = useState<Date>();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
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

    try {
      // Send a POST request to the API route
      const response = await fetch("./pages/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        // Optionally navigate to a new page
        router.push(`/${newProduct.id}`);
      } else {
        console.error("Failed to submit product");
      }
    } catch (error) {
      console.error("An error occurred while submitting the product:", error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-lg shadow-md bg-white"
      >
        <h1 className="text-2xl font-bold text-center">Upload Product</h1>

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
          <Label htmlFor="Category">Category</Label>
          <Input
            id="Category"
            name="Category"
            placeholder="Enter product Category"
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
          <Label htmlFor="Quantity">Quantity</Label>
          <Input
            id="Quantity"
            name="Quantity"
            placeholder="Enter product Quantity in Tons"
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
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
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
          <Label htmlFor="State">State</Label>
          <Input
            id="State"
            name="State"
            placeholder="Enter product State"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="City">City</Label>
          <Input
            id="City"
            name="City"
            placeholder="Enter product City"
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
          <Label htmlFor="price">Unit Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="Enter product unit price"
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
