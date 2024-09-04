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
      <div className="">
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {trending.map((item) => (
              <CarouselItem key={item.id}>
                <div>
                  <Card className="w-full h-40 flex items-center justify-center">
                    <CardContent className=" p-0">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="object-cover w-full h-full"
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
    </div>
  );
};

export default Trending;
