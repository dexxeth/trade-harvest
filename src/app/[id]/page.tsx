"use client";

import { useState } from "react";
import {
  Star,
  MessageSquare,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { products } from "@/app/data/items";

interface ProductDetailsProps {
  params: { id: string };
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [negotiationPrice, setNegotiationPrice] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleNegotiation = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Negotiation request sent for ₹${negotiationPrice}`);
    setNegotiationPrice("");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Review submitted successfully!");
    setReviewText("");
    setUserRating(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="relative h-72 bg-muted">
        <img
          src={product.image}
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/50"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/50"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? "bg-primary" : "bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 mb-16 p-4 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">₹{product.price}</span>
          <Badge variant="secondary">Free Shipping</Badge>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600">({product.rating})</span>
        </div>
        <p className="text-gray-600">{product.description}</p>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              Negotiate Price
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Negotiate Price</SheetTitle>
              <SheetDescription>
                Enter your desired price for this product
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleNegotiation} className="space-y-4 mt-4">
              <Input
                type="number"
                placeholder="Enter your price"
                value={negotiationPrice}
                onChange={(e) => setNegotiationPrice(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Send Offer
              </Button>
            </form>
          </SheetContent>
        </Sheet>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Customer Reviews</h2>
          {product.reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-4">
                <div className="flex items-center mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{review.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <p className="font-semibold">{review.user}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="pt-4">
            <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="mr-2">Rating:</span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < userRating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    } cursor-pointer`}
                    onClick={() => setUserRating(i + 1)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Share your thoughts about the product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <Button className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}
