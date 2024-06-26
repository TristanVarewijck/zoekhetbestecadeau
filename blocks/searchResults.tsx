"use client";

import { useState } from "react";
import { CoolblueProductProps, PopularProductsProps } from "@/app/types";
import H3Heading from "@/components/custom/heading/h3Heading";
import {
  ProductCard,
  ProductCardLoading,
} from "@/components/custom/productCard";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import H2Heading from "@/components/custom/heading/h2Heading";

interface SearchResultProps {
  productsArray: CoolblueProductProps[];
  loading: boolean;
  error: string | null;
  title: string;
  subtitle: string;
  productsPerPage: number;
}

const SearchResults = ({
  productsArray,
  loading,
  error,
  title,
  subtitle,
  productsPerPage,
}: SearchResultProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [randomizeDisabled, setRandomizeDisabled] = useState(false);
  const totalProducts = productsArray.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = productsArray.slice(startIndex, endIndex);

  console.log("productsArray", productsArray);

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
    return array.slice(0, productsPerPage);
  };

  const handleRandomize = () => {
    shuffleArray(productsArray);
    setRandomizeDisabled(true);
    setTimeout(() => {
      setRandomizeDisabled(false);
    }, 3000);
  };

  return (
    <section id="results-list" className="product-result">
      <div className="flex md:items-end justify-between flex-col md:flex-row lg:mb-8 mb-4">
        <div
          className="flex flex-col justify-center"
          style={{ maxWidth: "750px" }}
        >
          <H2Heading title={title} subtitle={subtitle} />
        </div>

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

      {/* show for laoding cards */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: productsPerPage }, (_, i) => (
            <ProductCardLoading key={i} />
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fout opgetreden.</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && paginatedProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedProducts.map((product, index) => (
            <Link href={product.product_url} key={product.sku}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      )}

      <Pagination className="mt-3 lg:mt-6">
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
