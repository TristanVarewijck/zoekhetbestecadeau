"use client";

import { useState } from "react";
import ProductCard from "@/Components/custom/productCard";
import ProductCardLoading from "@/Components/custom/loading/productCardLoading";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";
import { Button } from "@/Components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/Components/ui/alert";
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import H2Heading from "@/Components/custom/heading/h2Heading";
import { SearchResultProps } from "@/types/types";
import { scrollToElement } from "@/utils/scrollToElement";
import { Input } from "@/Components/ui/input";

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
        scrollToElement("results-list");
    };

    const handleNext = () => {
        setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
        scrollToElement("results-list");
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
            {title && (
                <div style={{ maxWidth: "750px", marginBottom: "16px" }}>
                    <H2Heading title={title} subtitle={subtitle} />
                </div>
            )}

            <div
                className={`flex flex-col mb-4 lg:flex-row justify-between items-end lg:mb-8 gap-6`}
            >
                <div className="w-full">
                    {/* <div className="text-sm">
                        {totalProducts} resultaten gevonden
                    </div> */}
                    <Input type="search" placeholder="Zoek in resultaten" />
                </div>
                <Button
                    className="mt-3 lg:mt-0"
                    variant="outline"
                    onClick={handleRandomize}
                    disabled={randomizeDisabled}
                >
                    Randomize
                    <span className="ml-1 text-lg">🎲</span>
                </Button>
            </div>

            {error && (
                <div className="mb-4">
                    <Alert variant="destructive">
                        <AlertCircle className="w-4 h-4" />
                        <AlertTitle>Fout opgetreden.</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            )}

            {/* show for loading cards */}
            {loading && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: productsPerPage }, (_, i) => (
                        <ProductCardLoading key={i} />
                    ))}
                </div>
            )}

            {!loading && paginatedProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-4 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {paginatedProducts.map((product) => (
                        <a
                            href={`/products` + "/" + product.id}
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
                        <div
                            className={`flex items-center gap-1 cursor-pointer max-sm:bg-[hsl(var(--primary))] max-sm:rounded-sm max-sm:px-2 max-sm:py-2`}
                            onClick={() => {
                                handlePrevious();
                            }}
                        >
                            <span>
                                <ArrowLeft
                                    size={16}
                                    className="max-sm:text-white"
                                />
                            </span>
                            <span className="hidden sm:block">Vorige</span>
                        </div>
                    </PaginationItem>

                    <div className="hidden sm:flex items-center gap-1">
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
                    </div>

                    <div className="px-4">
                        <span className="sm:hidden">
                            {currentPage} / {totalPages}
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1">
                        {totalPages > 5 && <PaginationEllipsis />}
                    </div>

                    <PaginationItem>
                        <div
                            className={`flex items-center gap-1 cursor-pointer max-sm:bg-[hsl(var(--primary))] max-sm:rounded-sm max-sm:px-2 max-sm:py-2`}
                            onClick={() => {
                                handleNext();
                            }}
                        >
                            <span className="hidden sm:block">Volgende</span>
                            <span>
                                <ArrowRight
                                    size={16}
                                    className="max-sm:text-white"
                                />
                            </span>
                        </div>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    );
};

export default SearchResults;
