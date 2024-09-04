// src/context/ProductsContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the Product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  location: string;
  uploadTime: Date;
  description: string;
  rating: number;
  images: string[];
  reviews: { id: number; user: string; rating: number; comment: string }[];
};
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Fresh Tomato",
    price: 2150,
    image: "/images/tomato.jpg",
    location: "Green Farm",
    uploadTime: new Date(2024, 8, 1, 14, 30),
    description: "Fresh tomatoes directly from Green Farm.",
    rating: 4.5,
    images: ["/images/tomato.jpg", "/images/tomato.jpg"], // Add your images here
    reviews: [
      { id: 1, user: "Radhe Shyam", rating: 5, comment: "Fresh and tasty!" },
    ],
  },
  {
    id: 2,
    name: "Organic Apples",
    price: 6500,
    image: "/images/apple.jpeg",
    location: "Kashmir, India",
    uploadTime: new Date(2024, 6, 11, 9, 15),
    description: "Organic Apples directly from Kashmir for only you .",
    rating: 4.5,
    images: ["/images/apple.jpeg", "/images/apple.jpeg"], // Add your images here
    reviews: [
      { id: 2, user: "Jugmeender", rating: 5, comment: "Fresh and tasty!" },
      { id: 2, user: "Shyamdhan", rating: 4, comment: "Mazedar" },
    ],
  },
  {
    id: 3,
    name: "Corn",
    price: 5350,
    image: "/images/corn.jpg",
    location: "UP, India",
    uploadTime: new Date(2024, 5, 12, 16, 45),
    description: "Organic Corn directly from UP, India for only you .",
    rating: 4.5,
    images: ["/images/corn.jpg", "/images/corn.jpg"], // Add your images here
    reviews: [
      { id: 2, user: "Jugmeender", rating: 5, comment: "Fresh and tasty!" },
      { id: 2, user: "Shyamdhan", rating: 4, comment: "Mazedar" },
    ],
  },
  {
    id: 4,
    name: "Wheat",
    price: 2310,
    image: "/images/wheat.jpg",
    location: "Jhajjar, Haryana",
    uploadTime: new Date(2024, 1, 12, 11, 20),
    description: "Organic Wheat directly from Jhajjar, Haryana for only you .",
    rating: 4.5,
    images: ["/images/wheat.jpg", "/images/wheat.jpg"], // Add your images here
    reviews: [
      { id: 2, user: "Jugmeender", rating: 5, comment: "Fresh and tasty!" },
      { id: 2, user: "Shyamdhan", rating: 4, comment: "Mazedar" },
    ],
  },
  {
    id: 5,
    name: "Carrots",
    price: 2200,
    image: "/images/carrot.jpg",
    location: "Bihar, India",
    uploadTime: new Date(2024, 2, 12, 15, 10),
    description: "Organic Carrots directly from Bihar for only you .",
    rating: 4.5,
    images: ["/images/carrot.jpg", "/images/carrot.jpg"], // Add your images here
    reviews: [
      { id: 2, user: "Jugmeender", rating: 5, comment: "Fresh and tasty!" },
      { id: 2, user: "Shyamdhan", rating: 4, comment: "Mazedar" },
    ],
  },
  {
    id: 6,
    name: "Potato",
    price: 1850,
    image: "/images/potato.jpg",
    location: "Rohtak, India",
    uploadTime: new Date(2024, 6, 13, 8, 15),
    description: "Organic Potato directly from Rohtak for only you .",
    rating: 4.5,
    images: ["/images/potato.jpg", "/images/potato.jpg"], // Add your images here
    reviews: [
      { id: 2, user: "Jugmeender", rating: 5, comment: "Fresh and tasty!" },
      { id: 2, user: "Shyamdhan", rating: 4, comment: "Mazedar" },
    ],
  },
  {
    id: 7,
    name: "Lady Finger",
    price: 4600,
    image: "/images/lady.jpeg",
    location: "Sirsa, India",
    uploadTime: new Date(2024, 7, 12, 15, 10),
    description: "Organic Lady Fingers directly from Sirsa for only you .",
    rating: 4.5,
    images: ["/images/lady.jpeg", "/images/lady.jpeg"], // Add your images here
    reviews: [
      { id: 2, user: "Jugmeender", rating: 5, comment: "Fresh and tasty!" },
      { id: 2, user: "Shyamdhan", rating: 4, comment: "Mazedar" },
    ],
  },
  {
    id: 8,
    name: "Ginger",
    price: 5700,
    image: "/images/ginger.jpg",
    location: "Sirsa, India",
    uploadTime: new Date(2024, 7, 10, 15, 10),
    description: "Organic Gingers directly from Rohtak for only you .",
    rating: 4.5,
    images: ["/images/giger.jpg", "/images/ginger.jpg"], // Add your images here
    reviews: [
      { id: 2, user: "Jugmeender", rating: 5, comment: "Fresh and tasty!" },
      { id: 2, user: "Shyamdhan", rating: 4, comment: "Mazedar" },
    ],
  },
];

// Context definition
type ProductsContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  // Initialize the state with the initial products
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
