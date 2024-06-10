"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import ProductCard from "@/components/custom/productCard";
import Autoplay from "embla-carousel-autoplay";
import { ProductProps } from "@/app/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorageFilters } from "@/hooks/useLocalStorageFilters";
import H2Heading from "@/components/custom/heading/h2Heading";
import { Badge } from "@/components/ui/badge";

// we can make this broader later on for example get the popular products by interests from the backend
interface PopularProductsProps {
  occasions: string[] | undefined;
  occasion?: string;
}

const PopularProducts = ({ occasions, occasion }: PopularProductsProps) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const localStoredQuery = useLocalStorageFilters(["occasions"]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (localStoredQuery) {
        try {
          // only occasion should be filtered in populair products
          // const response = await axios.post("/api/populair-products", {
          //   query,
          // });

          const response = await axios.post("/api/products", {
            query: {
              occasions,
            },
          });

          const popularProducts = response.data;

          if (popularProducts.length === 0) {
            const response = await axios.post("/api/products", {});
            const products = response.data;
            setProducts(products);
          } else {
            setProducts(popularProducts);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [localStoredQuery, occasions]);

  return (
    <div>
      <Badge variant="default" className="mb-3">
        {occasion
          ? `${occasion[0].toUpperCase()}${occasion.slice(1)}: ${
              products.length
            } ${products.length === 1 ? "nieuw" : "nieuwe"} ${
              products.length === 1 ? "cadeau" : "cadeaus"
            }`
          : `Populaire cadeaus`}{" "}
        🔥
      </Badge>
      <H2Heading
        title={`${
          occasion
            ? `Populaire cadeaus: "${occasion[0].toUpperCase()}${occasion.slice(
                1
              )}"`
            : `Populaire cadeaus`
        }`}
      />

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
        className="w-full mt-6"
      >
        {products.length > 0 && (
          <CarouselContent>
            {products.map((product) => (
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
        )}
      </Carousel>
    </div>
  );
};

export default PopularProducts;
