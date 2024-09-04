"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Share2 } from "lucide-react";
import { newsItems } from "@/app/data/news";

export default function MobileInshortsNewsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0 && currentIndex < newsItems.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }

    touchStartY.current = null;
  };

  const handleShare = () => {
    // Implement share functionality here
    alert("Share functionality to be implemented");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 overflow-hidden m-4">
        Trending 🔥
      </h1>
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {newsItems.map((item, index) => (
            <Card
              key={item.id}
              className="h-full border-none rounded-none shadow-none bg-gray-800"
            >
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-[248px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="h-[100px] px-4 py-2 flex items-center">
                  <h2 className="text-xl font-bold line-clamp-2 text-gray-100">
                    {item.title}
                  </h2>
                </div>
                <div className="h-[1px] bg-gray-700 mx-4" /> {/* Break line */}
                <div className="h-[248px] px-4 py-2 overflow-y-auto">
                  <p className="text-sm text-gray-300">{item.content}</p>
                </div>
                <div className="h-[14%] px-4 py-2 flex justify-between items-center">
                  <p className="text-xs text-gray-400">{item.date}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-gray-300 hover:text-gray-100"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-800 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="text-gray-300 hover:text-gray-100 disabled:text-gray-600"
        >
          <ChevronUp className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span className="text-sm font-medium text-gray-300">
          {currentIndex + 1} / {newsItems.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setCurrentIndex(Math.min(newsItems.length - 1, currentIndex + 1))
          }
          disabled={currentIndex === newsItems.length - 1}
          className="text-gray-300 hover:text-gray-100 disabled:text-gray-600"
        >
          Next
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
