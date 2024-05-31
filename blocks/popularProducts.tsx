"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import ProductCard from "@/components/custom/productCard";
import Autoplay from "embla-carousel-autoplay";
import { PopularProductsProps } from "@/app/types";
import Link from "next/link";

const PopularProducts = ({ productsArray }: PopularProductsProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        direction: "ltr",
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {productsArray.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-1/1 md:basis-1/2 lg:basis-1/4"
          >
            <Link href={product.url} target="_blank">
              <ProductCard {...product} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PopularProducts;
