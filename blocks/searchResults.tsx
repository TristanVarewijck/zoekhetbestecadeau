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

const SearchResults = ({ productsArray }: PopularProductsProps) => {
  const productsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = productsArray.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productsArray.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
  };

  return (
    <section>
      <H3Heading
        title={`🎁 ${totalProducts} cadeau's gevonden:`}
        subtitle="Blijf filteren om betere cadeau's te krijgen 🔎"
      />

      <div
        className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3"
        id="results-list"
      >
        {currentProducts.map((product) => (
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
