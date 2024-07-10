"use client";

import { useState } from "react";
import {
    ProductCard,
    ProductCardLoading,
} from "@/Components/custom/productCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Button } from "@/Components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/Components/ui/alert";
import { AlertCircle } from "lucide-react";
import H2Heading from "@/Components/custom/heading/h2Heading";
import { ProductProps } from "@/types/types";

interface SearchResultProps {
    productsArray: ProductProps[];
    loading: boolean;
    error: string | null;
    title: string;
    subtitle?: string;
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
            <div className="flex flex-col justify-between mb-4 md:items-end md:flex-row lg:mb-8">
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
                    <AlertCircle className="w-4 h-4" />
                    <AlertTitle>Fout opgetreden.</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {!loading && paginatedProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-4 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {paginatedProducts.map((product) => (
                        <a
                            href={"/products" + "/" + product.id}
                            key={product.serial_number}
                        >
                            <ProductCard {...product} />
                        </a>
                    ))}
                </div>
            )}

            <Pagination className="mt-3 lg:mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#results-list"
                            onClick={handlePrevious}
                        />
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
                        <PaginationNext
                            href="#results-list"
                            onClick={handleNext}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    );
};

export default SearchResults;
