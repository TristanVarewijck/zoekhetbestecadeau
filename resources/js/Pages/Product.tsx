import H2Heading from "@/Components/custom/heading/h2Heading";
import SectionLayout from "@/Components/custom/sectionLayout";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { ProductProps } from "@/types/types";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import {
    Blocks,
    ChevronDown,
    ChevronUp,
    DotIcon,
    ReceiptText,
    ShoppingBag,
    Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

const Product = () => {
    const { id } = usePage().props;
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [showDescription, setShowDescription] = useState(false);

    const retrieveProduct = async () => {
        const response = await axios.get(`/api/products/${id}`, {
            headers: {
                "content-type": "application/json",
            },
        });

        const { data } = response;

        if (data === "Product not found") {
            setProduct(null);
            setLoadingProduct(false);
            return;
        }

        setProduct(data);
        setLoadingProduct(false);
    };

    useEffect(() => {
        retrieveProduct();
    }, [id]);

    return (
        <SectionLayout bgColor="white">
            <div className="mt-8 lg:mt-10">
                {/* loading state */}
                {loadingProduct && <p>Loading...</p>}

                {/* error state */}
                {loadingProduct === false && !product && (
                    <p>Product not found</p>
                )}

                {loadingProduct === false && product && (
                    // container
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
                        {/* image box */}
                        <div className="flex flex-col gap-2 h-full">
                            {/* tags */}
                            <div className="flex gap-4 items-center">
                                {/* brand */}
                                <p>
                                    <span className="font-bold text-[11px] text-[hsl(var(--primary))]">
                                        Merk:
                                    </span>{" "}
                                    <span className="font-bold text-xs">
                                        {product.brand_name}
                                    </span>
                                </p>

                                {/* serial number */}
                                <p>
                                    <span className="font-bold text-[11px] text-[hsl(var(--primary))]">
                                        Serial number:
                                    </span>{" "}
                                    <span className="font-bold text-xs">
                                        {product.serial_number}
                                    </span>
                                </p>
                            </div>
                            {/* image */}
                            <a href={product.affiliate_link} target="_blank">
                                <div className="h-[300px] md:h-[550px] relative">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="h-full w-full"
                                        style={{
                                            objectFit: "contain",
                                            objectPosition: "center",
                                        }}
                                    />
                                </div>
                            </a>
                            {/* productID */}
                            <div>
                                <p>
                                    <span className="font-bold text-[11px] text-[hsl(var(--primary))]">
                                        Product ID:
                                    </span>{" "}
                                    <span className="font-bold text-xs">
                                        {product.id}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* product details */}
                        <div className={`flex flex-col gap-6`}>
                            <div>
                                {/* stock */}
                                <p className="flex items-center font-bold text-xs gap-1">
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

                                {/* name */}
                                <h1
                                    className={`scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight leading-[125%] font-display mb-3`}
                                >
                                    {product.name}
                                </h1>

                                {/* description */}
                                <div>
                                    <div
                                        className={`relative h-[85px] ${
                                            showDescription ? `h-fit` : ""
                                        } overflow-hidden`}
                                    >
                                        <p className="text-sm">
                                            {product.description}
                                        </p>
                                        {!showDescription && (
                                            <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                        )}
                                    </div>

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
                                </div>
                            </div>

                            {/* price container */}
                            <Card className="p-4 bg-gray-100 border w-ful rounded-sm flex flex-col gap-5">
                                {/* price */}
                                <div>
                                    <p
                                        className={`flex items-center gap-2 font-bold text-5xl`}
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
                                <div className="flex items-center gap-4">
                                    <Button asChild variant={"default"}>
                                        <a
                                            href={product.affiliate_link}
                                            target="_blank"
                                        >
                                            <span>Nu kopen</span>
                                        </a>
                                    </Button>
                                    <Button asChild variant={"secondary"}>
                                        <a
                                            href={product.affiliate_link}
                                            target="_blank"
                                            className="flex items-center gap-1"
                                        >
                                            <span>
                                                <ShoppingBag size={16} />
                                            </span>
                                            <span>
                                                In winkelmandje plaatsen
                                            </span>
                                        </a>
                                    </Button>
                                </div>
                            </Card>

                            {/* details */}
                            <div className="flex flex-col gap-4">
                                {/* delivery time */}
                                <p
                                    className={`flex items-center gap-2 pb-2 border-b-2`}
                                >
                                    <span>
                                        <Truck size={16} />
                                    </span>
                                    <span>{product.delivery_time}</span>
                                </p>

                                {/* more */}
                                <p
                                // className={`flex items-center gap-2 pb-2 border-b-2`}
                                >
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
                                                    <span>Meer details</span>
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Yes. It adheres to the WAI-ARIA
                                                design pattern.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* recommends */}
            <div>
                <H2Heading title="Cadeaus die minstens even leuk zijn 🎁!" />
            </div>
        </SectionLayout>
    );
};

export default Product;
