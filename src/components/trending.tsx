import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Trending = () => {
	return (
		<div>
			<div className="">
				<Carousel opts={{ loop: true }} className="w-full">
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={index}>
								<div>
									<Card className="w-full h-40 flex items-center justify-center">
										<CardContent className=" p-6">
											<span className="text-4xl font-semibold">
												{index + 1}
											</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					{/* <CarouselPrevious />
				<CarouselNext /> */}
				</Carousel>
			</div>
		</div>
	);
};

export default Trending;
