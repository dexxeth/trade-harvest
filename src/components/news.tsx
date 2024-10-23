"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Share2 } from "lucide-react";

interface NewsItem {
	source: string;
	title: string;
	link: string;
	published: string | null;
	image: string | null;
	description: string | null;
}

export default function NewsPage() {
	const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	// const touchStartY = useRef<number | null>(null);

	// Fetching news data from Flask API
	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch("http://127.0.0.1:5000/api/rss");
				const data = await response.json();
				setNewsItems(data);
			} catch (error) {
				console.error("Failed to fetch news data:", error);
			}
		};

		fetchNews();
	}, []);

	// const handleTouchStart = (e: React.TouchEvent) => {
	// 	touchStartY.current = e.touches[0].clientY;
	// };

	// const handleTouchEnd = (e: React.TouchEvent) => {
	// 	if (touchStartY.current === null) return;

	// 	const touchEndY = e.changedTouches[0].clientY;
	// 	const diff = touchStartY.current - touchEndY;

	// 	if (Math.abs(diff) > 50) {
	// 		if (diff > 0 && currentIndex < newsItems.length - 1) {
	// 			setCurrentIndex(currentIndex + 1);
	// 		} else if (diff < 0 && currentIndex > 0) {
	// 			setCurrentIndex(currentIndex - 1);
	// 		}
	// 	}

	// 	touchStartY.current = null;
	// };

	const handleShare = () => {
		alert("Share functionality to be implemented");
	};

	return (
		<div className="h-screen flex flex-col">
			<h1 className="top-0 sticky text-3xl font-bold mb-6 overflow-hidden mx-4 my-2 bg-[#f3f4f6]">
				Trending
			</h1>
			<div className="bg-[#f3f4f6] flex-1 overflow-hidden">
				<div
					className="h-full transition-transform duration-300 ease-in-out"
					style={{ transform: `translateY(-${currentIndex * 100}%)` }}
					// onTouchStart={handleTouchStart}
					// onTouchEnd={handleTouchEnd}
				>
					{newsItems.map((item, index) => (
						<Card
							key={index}
							className="h-full border-none rounded-none shadow-none"
							onClick={() => window.open(item.link, "_blank")} // Redirect to the original page on click
						>
							<CardContent className="p-0 h-full flex flex-col">
								<div className="relative h-[248px]">
									{item.image ? (
										<Image
											src={
												item.image ||
												"/default-image.png"
											} // Path to your default image
											alt={item.title}
											layout="fill"
											objectFit="cover"
										/>
									) : (
										<div className="h-full bg-gray-200 flex items-center justify-center">
											<p>No image available</p>
										</div>
									)}
								</div>
								<div className="h-[100px] px-4 flex items-center">
									<h2 className="text-xl font-bold line-clamp-2">
										{item.title}
									</h2>
								</div>
								<div className="h-[1px] bg-gray-700 mx-4" />
								<div className="h-[248px] px-4  overflow-y-auto">
									{/* <p className="text-sm font-semibold">{item.published}</p> */}
									<p className="text-sm pt-3">
										{item.description}
									</p>
								</div>
								<div className="px-4 flex justify-between items-center">
									<p className="text-xs text-gray-400">
										{item.published}
									</p>
									<Button
										variant="ghost"
										size="sm"
										onClick={handleShare}
										className="text-gray-300 hover:text-gray-100">
										<Share2 className="h-4 w-4" />
										<span className="sr-only">Share</span>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
			<div className="flex bottom-0 bg-[#f3f4f6] justify-between items-center mb-12 border-t">
				<Button
					variant="ghost"
					size="sm"
					onClick={() =>
						setCurrentIndex(Math.max(0, currentIndex - 1))
					}
					disabled={currentIndex === 0}
					className="disabled:text-gray-600">
					<ChevronUp className="h-4 w-4 mr-2" />
					Previous
				</Button>
				{/* <span className="text-sm font-medium text-gray-300">
					{currentIndex + 1} / {newsItems.length}
				</span> */}
				<Button
					variant="ghost"
					size="sm"
					onClick={() =>
						setCurrentIndex(
							Math.min(newsItems.length - 1, currentIndex + 1)
						)
					}
					disabled={currentIndex === newsItems.length - 1}
					className="disabled:text-gray-600">
					Next
					<ChevronDown className="h-4 w-4 ml-2" />
				</Button>
			</div>
		</div>
	);
}
