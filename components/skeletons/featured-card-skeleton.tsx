import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export const FeaturedCardSkeleton = () => {
  return (
    <main>
      <div className="mb-10">
        <h1 className="w-full font-jakara text-[24px] md:text-2xl font-bold text-left mb-10 leading-[32px]">
          Featured Posts
        </h1>

        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <CarouselItem key={i} className="pl-1 md:basis-1/3 lg:basis-1/4">
                <Skeleton className=" w-full h-[300px] rounded-md bg-cover bg-no-repeat bg-center cursor-pointer" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
};
