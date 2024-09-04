import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Clock } from "lucide-react";

// Sample product data (replace with your actual data source)
const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 2.99,
    image: "/placeholder.svg",
    location: "Green Farm",
    uploadTime: new Date(2023, 5, 10, 14, 30),
  },
  {
    id: 2,
    name: "Organic Apples",
    price: 3.99,
    image: "/placeholder.svg",
    location: "Orchard Valley",
    uploadTime: new Date(2023, 5, 11, 9, 15),
  },
  {
    id: 3,
    name: "Farm Eggs",
    price: 4.5,
    image: "/placeholder.svg",
    location: "Happy Hens Farm",
    uploadTime: new Date(2023, 5, 11, 16, 45),
  },
  {
    id: 4,
    name: "Honey Jar",
    price: 6.99,
    image: "/placeholder.svg",
    location: "Buzzy Bee Apiary",
    uploadTime: new Date(2023, 5, 12, 11, 20),
  },
  {
    id: 5,
    name: "Carrots Bundle",
    price: 2.5,
    image: "/placeholder.svg",
    location: "Root Veggie Gardens",
    uploadTime: new Date(2023, 5, 12, 15, 10),
  },
  {
    id: 6,
    name: "Lettuce Head",
    price: 1.99,
    image: "/placeholder.svg",
    location: "Leafy Greens Farm",
    uploadTime: new Date(2023, 5, 13, 8, 5),
  },
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 2.99,
    image: "/placeholder.svg",
    location: "Green Farm",
    uploadTime: new Date(2023, 5, 10, 14, 30),
  },
  {
    id: 2,
    name: "Organic Apples",
    price: 3.99,
    image: "/placeholder.svg",
    location: "Orchard Valley",
    uploadTime: new Date(2023, 5, 11, 9, 15),
  },
  {
    id: 3,
    name: "Farm Eggs",
    price: 4.5,
    image: "/placeholder.svg",
    location: "Happy Hens Farm",
    uploadTime: new Date(2023, 5, 11, 16, 45),
  },
  {
    id: 4,
    name: "Honey Jar",
    price: 6.99,
    image: "/placeholder.svg",
    location: "Buzzy Bee Apiary",
    uploadTime: new Date(2023, 5, 12, 11, 20),
  },
  {
    id: 5,
    name: "Carrots Bundle",
    price: 2.5,
    image: "/placeholder.svg",
    location: "Root Veggie Gardens",
    uploadTime: new Date(2023, 5, 12, 15, 10),
  },
  {
    id: 6,
    name: "Lettuce Head",
    price: 1.99,
    image: "/placeholder.svg",
    location: "Leafy Greens Farm",
    uploadTime: new Date(2023, 5, 13, 8, 5),
  },
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 2.99,
    image: "/placeholder.svg",
    location: "Green Farm",
    uploadTime: new Date(2023, 5, 10, 14, 30),
  },
  {
    id: 2,
    name: "Organic Apples",
    price: 3.99,
    image: "/placeholder.svg",
    location: "Orchard Valley",
    uploadTime: new Date(2023, 5, 11, 9, 15),
  },
  {
    id: 3,
    name: "Farm Eggs",
    price: 4.5,
    image: "/placeholder.svg",
    location: "Happy Hens Farm",
    uploadTime: new Date(2023, 5, 11, 16, 45),
  },
  {
    id: 4,
    name: "Honey Jar",
    price: 6.99,
    image: "/placeholder.svg",
    location: "Buzzy Bee Apiary",
    uploadTime: new Date(2023, 5, 12, 11, 20),
  },
  {
    id: 5,
    name: "Carrots Bundle",
    price: 2.5,
    image: "/placeholder.svg",
    location: "Root Veggie Gardens",
    uploadTime: new Date(2023, 5, 12, 15, 10),
  },
  {
    id: 6,
    name: "Lettuce Head",
    price: 1.99,
    image: "/placeholder.svg",
    location: "Leafy Greens Farm",
    uploadTime: new Date(2023, 5, 13, 8, 5),
  },
  {
    id: 6,
    name: "Lettuce Head",
    price: 1.99,
    image: "/placeholder.svg",
    location: "Leafy Greens Farm",
    uploadTime: new Date(2023, 5, 13, 8, 5),
  },
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 2.99,
    image: "/placeholder.svg",
    location: "Green Farm",
    uploadTime: new Date(2023, 5, 10, 14, 30),
  },
  {
    id: 2,
    name: "Organic Apples",
    price: 3.99,
    image: "/placeholder.svg",
    location: "Orchard Valley",
    uploadTime: new Date(2023, 5, 11, 9, 15),
  },
  {
    id: 3,
    name: "Farm Eggs",
    price: 4.5,
    image: "/placeholder.svg",
    location: "Happy Hens Farm",
    uploadTime: new Date(2023, 5, 11, 16, 45),
  },
  {
    id: 4,
    name: "Honey Jar",
    price: 6.99,
    image: "/placeholder.svg",
    location: "Buzzy Bee Apiary",
    uploadTime: new Date(2023, 5, 12, 11, 20),
  },
  {
    id: 5,
    name: "Carrots Bundle",
    price: 2.5,
    image: "/placeholder.svg",
    location: "Root Veggie Gardens",
    uploadTime: new Date(2023, 5, 12, 15, 10),
  },
  {
    id: 6,
    name: "Lettuce Head",
    price: 1.99,
    image: "/placeholder.svg",
    location: "Leafy Greens Farm",
    uploadTime: new Date(2023, 5, 13, 8, 5),
  },
  {
    id: 5,
    name: "Carrots Bundle",
    price: 2.5,
    image: "/placeholder.svg",
    location: "Root Veggie Gardens",
    uploadTime: new Date(2023, 5, 12, 15, 10),
  },
  {
    id: 6,
    name: "Lettuce Head",
    price: 1.99,
    image: "/placeholder.svg",
    location: "Leafy Greens Farm",
    uploadTime: new Date(2023, 5, 13, 8, 5),
  },
];

function formatRelativeTime(date: Date) {
  return formatDistanceToNow(date, { addSuffix: true });
}

export default function ProductListPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Farm Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-32 object-cover"
            />
            <CardContent className="p-3">
              <h2 className="font-semibold text-sm mb-1 truncate">
                {product.name}
              </h2>
              <p className="text-primary font-bold mb-2">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate">{product.location}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                <span>{formatRelativeTime(product.uploadTime)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
