import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { trending } from "@/app/data/carousel";

const Trending = () => {
	return (
		<div>
			<Carousel opts={{ loop: true }} className="w-full">
				<CarouselContent>
					{trending.map((item) => (
						<CarouselItem key={item.id}>
							<div>
								<Card className="flex items-center justify-center shadow-md border-none">
									<CardContent className="p-0">
										<img
											src={item.imageUrl}
											alt={item.title}
											className="object-cover"
										/>
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
	);
};

export default Trending;
