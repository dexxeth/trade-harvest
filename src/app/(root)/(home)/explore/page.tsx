"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Share2 } from "lucide-react"

const newsItems = [
  {
    id: 1,
    title: "New Drought-Resistant Crop Variety Developed",
    content: "Scientists have successfully created a new crop variety that can withstand prolonged periods of drought, potentially revolutionizing farming in arid regions. This breakthrough could significantly improve crop yields in areas affected by water scarcity, providing a sustainable solution for farmers facing climate change challenges.",
    image: "/images/photo.jpg",
    date: "2023-06-15",
  },
  {
    id: 2,
    title: "Government Announces Increased Subsidies for Organic Farming",
    content: "In a move to promote sustainable agriculture, the government has announced a significant increase in subsidies for farmers transitioning to organic farming methods. This initiative aims to support environmentally friendly practices and meet the growing consumer demand for organic produce. The new subsidy program will cover up to 50% of the transition costs for eligible farmers.",
    image: "/placeholder.svg",
    date: "2023-06-14",
  },
  {
    id: 3,
    title: "Local Farmer's Market Expands to Weekday Operations",
    content: "Due to increasing demand, the popular weekend farmer's market will now operate on Wednesdays as well, providing more opportunities for farmers to sell their produce. This expansion is expected to benefit both local farmers and consumers, offering fresh, locally-sourced products throughout the week. The new weekday market will be located in the central square and will run from 2 PM to 7 PM.",
    image: "/placeholder.svg",
    date: "2023-06-13",
  },
  {
    id: 4,
    title: "New App Helps Farmers Predict Weather Patterns",
    content: "A newly launched mobile application uses advanced AI to provide highly accurate local weather forecasts, helping farmers make informed decisions about planting and harvesting. The app, developed by a team of meteorologists and agricultural experts, combines satellite data, ground sensors, and machine learning algorithms to deliver personalized predictions for specific farm locations.",
    image: "/placeholder.svg",
    date: "2023-06-12",
  },
]

export default function MobileInshortsNewsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartY = useRef(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return

    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && currentIndex < newsItems.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }

    touchStartY.current = null
  }

  const handleShare = () => {
    // Implement share functionality here
    alert("Share functionality to be implemented")
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {newsItems.map((item, index) => (
            <Card key={item.id} className="h-full border-none rounded-none shadow-none bg-gray-800">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-[35%]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="h-[15%] px-4 py-2 flex items-center">
                  <h2 className="text-xl font-bold line-clamp-2 text-gray-100">{item.title}</h2>
                </div>
                <div className="h-[1px] bg-gray-700 mx-4" /> {/* Break line */}
                <div className="h-[35%] px-4 py-2 overflow-y-auto">
                  <p className="text-sm text-gray-300">{item.content}</p>
                </div>
                <div className="h-[14%] px-4 py-2 flex justify-between items-center">
                  <p className="text-xs text-gray-400">{item.date}</p>
                  <Button variant="ghost" size="sm" onClick={handleShare} className="text-gray-300 hover:text-gray-100">
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
          onClick={() => setCurrentIndex(Math.min(newsItems.length - 1, currentIndex + 1))}
          disabled={currentIndex === newsItems.length - 1}
          className="text-gray-300 hover:text-gray-100 disabled:text-gray-600"
        >
          Next
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}