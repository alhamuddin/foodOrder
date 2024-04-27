import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Carouseles() {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <img src="/hero.png" alt="hero" />
          </CarouselItem>
          <CarouselItem>
            <img src="/landing.png" alt="land" />
          </CarouselItem>
          <CarouselItem>
            <img src="/hero.png" alt="hero" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
