import SectionLayout from "@/Components/custom/sectionLayout";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { ProductProps } from "@/types/types";
import {
    Blocks,
    Building2,
    ChevronDown,
    ChevronUp,
    ReceiptText,
    ShoppingBag,
    Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import SearchResults from "@/blocks/searchResults";
import { Head } from "@inertiajs/react";

const Product = ({
    product,
    products,
}: {
    product: ProductProps;
    products: ProductProps[];
}) => {
    const [showDescription, setShowDescription] = useState(false);
    const [showDescriptionButton, setShowDescriptionButton] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descriptionRef.current) {
            const descriptionHeight = descriptionRef.current.scrollHeight;
            if (descriptionHeight > 85) {
                setShowDescriptionButton(true);
            }
        }
    }, [product]);

    return (
        <SectionLayout bgColor="white">
            <Head
                title={`${product.name} - ${product.brand_name} kopen bij zoekhetbestecadeau.nl.
            `}
            />
            <div className="mt-8 lg:mt-10 mb-8 lg:mb-10">
                {/* product */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
                    {/* image box */}
                    <div className="flex flex-col gap-2 h-full">
                        {/* tags */}
                        <div>
                            {/* product route */}
                            <p>
                                <span className="font-bold text-xs text-[hsl(var(--primary))]">
                                    {product.category_path}
                                </span>
                            </p>
                        </div>
                        {/* image */}
                        <a href={product.affiliate_link} target="_blank">
                            <div className="h-[300px] md:h-[550px] relative">
                                <img
                                    src={product.image_url}
                                    alt={product.name + " image"}
                                    className="h-full w-full"
                                    style={{
                                        objectFit: "contain",
                                        objectPosition: "center",
                                    }}
                                />
                            </div>
                        </a>
                    </div>

                    {/* product details */}
                    <div className={`flex flex-col gap-6`}>
                        <div>
                            <div
                                className={`flex items-start gap-2 flex-col md:flex-row md:items-start justify-between mb-2`}
                            >
                                {/* stock */}
                                <p className="flex items-center font-bold gap-1 text-sm">
                                    <span>
                                        <Blocks
                                            size={16}
                                            className="text-[hsl(var(--primary))]"
                                        />
                                    </span>
                                    <span>
                                        {product.stock > 0 ? (
                                            <span>
                                                {product.stock > 10 ? (
                                                    "Op voorraad"
                                                ) : (
                                                    <span>
                                                        Nog maar{" "}
                                                        <span className="text-red-500 font-bold">
                                                            {product.stock}
                                                        </span>{" "}
                                                        op voorraad!
                                                    </span>
                                                )}
                                            </span>
                                        ) : (
                                            "Niet op voorraad"
                                        )}
                                    </span>
                                </p>

                                {/* brand */}
                                <p className="flex items-center gap-1 text-sm">
                                    <span className="text-[hsl(var(--primary))]">
                                        <Building2 size={16} />
                                    </span>{" "}
                                    <span className="font-bold">
                                        {product.brand_name}
                                    </span>
                                </p>
                            </div>

                            {/* name */}
                            <h1
                                className={`text-3xl md:text-4xl font-bold tracking-tight leading-[125%] font-display mb-3`}
                            >
                                {product.name}
                            </h1>

                            {/* description */}
                            <div>
                                <div
                                    ref={descriptionRef}
                                    className={`relative h-[85px] ${
                                        showDescription ? `h-fit` : ""
                                    } overflow-hidden`}
                                >
                                    <p className="text-sm">
                                        {product.description}
                                    </p>
                                    {!showDescription &&
                                        showDescriptionButton && (
                                            <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                        )}
                                </div>

                                {showDescriptionButton && (
                                    <Button
                                        variant={"link"}
                                        className="text-sm p-0 m-0"
                                        onClick={() =>
                                            setShowDescription(!showDescription)
                                        }
                                    >
                                        <span>
                                            {showDescription ? (
                                                <span className="flex items-center gap-1">
                                                    Minder lezen
                                                    <ChevronUp size={16} />
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    Meer lezen
                                                    <ChevronDown size={16} />
                                                </span>
                                            )}
                                        </span>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* price container */}
                        <Card className="p-4 bg-gray-100 border w-ful rounded-sm flex flex-col gap-5">
                            {/* price */}
                            <div>
                                <p
                                    className={`flex items-center justify-center lg:justify-start gap-2 font-bold text-4xl font-display`}
                                >
                                    <span>
                                        {getSymbolFromCurrency(
                                            product.currency
                                        )}
                                        {product.price},-
                                    </span>
                                </p>
                            </div>

                            {/* affiliate link */}
                            <div className="flex items-center flex-col xl:flex-row gap-4">
                                <Button
                                    asChild
                                    variant={"default"}
                                    className="w-full lg:w-auto"
                                >
                                    <a
                                        href={product.affiliate_link}
                                        target="_blank"
                                    >
                                        <span>Nu kopen</span>
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant={"secondary"}
                                    className="w-full lg:w-auto"
                                >
                                    <a
                                        href={product.affiliate_link}
                                        target="_blank"
                                        className="flex items-center gap-1"
                                    >
                                        <span>
                                            <ShoppingBag size={16} />
                                        </span>
                                        <span>In winkelmandje</span>
                                    </a>
                                </Button>
                            </div>
                        </Card>

                        {/* details */}
                        <div className="flex flex-col gap-4">
                            {/* delivery time */}
                            {product.delivery_time && (
                                <p
                                    className={`flex items-center gap-2 pb-2 border-b-2`}
                                >
                                    <Truck size={16} />
                                    <span className="font-medium">
                                        {product.delivery_time}
                                    </span>
                                </p>
                            )}

                            {/* more */}
                            <div>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full border-none"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="border-none py-2">
                                            <span
                                                className={`flex items-center gap-1`}
                                            >
                                                <ReceiptText size={16} />
                                                <span className="font-medium">
                                                    Meer details
                                                </span>
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex items-center gap-1">
                                                <span>
                                                    <strong>
                                                        Serial number:
                                                    </strong>
                                                </span>
                                                <span>
                                                    {product.serial_number}
                                                </span>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* recommends */}
            <SearchResults
                productsArray={products}
                loading={false}
                error={
                    products.length === 0
                        ? "Geen aanbevolen producten gevonden."
                        : ""
                }
                title={"Cadeaus die even leuk zijn 🎁!"}
                subtitle={
                    "Vind hier cadeaus die even leuk zijn als degene hierboven!"
                }
                productsPerPage={24}
            />
        </SectionLayout>
    );
};

export default Product;
