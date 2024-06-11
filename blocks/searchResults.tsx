"use client";

import { useState } from "react";
import { PopularProductsProps } from "@/app/types";
import H3Heading from "@/components/custom/heading/h3Heading";
import ProductCard from "@/components/custom/productCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SearchResults = ({ productsArray }: PopularProductsProps) => {
  const productsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [randomizeDisabled, setRandomizeDisabled] = useState(false);
  const totalProducts = productsArray.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = productsArray.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleRandomize = () => {
    shuffleArray(productsArray);
    setRandomizeDisabled(true);
    setTimeout(() => {
      setRandomizeDisabled(false);
    }, 3000);
  };

  return (
    <section>
      <div className="flex md:items-end justify-between flex-col md:flex-row">
        <H3Heading
          title={`🎁 ${totalProducts} cadeau's gevonden!`}
          subtitle="Blijf filteren om betere cadeau's te krijgen 🔎"
        />

        <Button
          className="mt-3 lg:mt-0"
          variant="outline"
          onClick={handleRandomize}
          disabled={randomizeDisabled}
        >
          Randomize de cadeaus
          <span className="ml-1 text-lg">🎲</span>
        </Button>
      </div>

      <div
        className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3"
        id="results-list"
      >
        {paginatedProducts.map((product) => (
          <Link href={product.url} key={product.id}>
            <ProductCard {...product} />
          </Link>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#results-list" onClick={handlePrevious} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#results-list"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 5 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext href="#results-list" onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default SearchResults;
