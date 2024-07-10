import SectionLayout from "@/Components/custom/sectionLayout";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { ProductProps } from "@/types/types";
import { usePage } from "@inertiajs/react";
import axios from "axios";
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

const Product = () => {
    const { id } = usePage().props;
    const [showDescription, setShowDescription] = useState(false);
    const [showDescriptionButton, setShowDescriptionButton] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    // product by ID
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [loadingProduct, setLoadingProduct] = useState(true);

    // products by category & subcategory
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    // retrieve product by ID
    const retrieveProduct = async () => {
        const response = await axios.get(`/api/products/${id}`, {
            headers: {
                "content-type": "application/json",
            },
        });

        const { data } = response;

        if (data === "Product not found") {
            window.location.href = "/404";
            return;
        }

        setProduct(data);
        setLoadingProduct(false);
    };

    // retrieve products by category & subcategory
    const retrieveProducts = async (category: string, subcategory: string) => {
        const response = await axios.get(
            `/api/products/${category}/${subcategory}`,
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );

        const { data } = response;

        if (data.length === 0) {
            setProducts([]);
            setLoadingProducts(false);
            return;
        }

        console.log(data);
        setProducts(data);
        setLoadingProducts(false);
    };

    useEffect(() => {
        if (!product) {
            retrieveProduct();
        }

        if (product && product.category_id && product.sub_category_id) {
            retrieveProducts(product.category_id, product.sub_category_id);
        }
    }, [id, product]);

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
            <div className="mt-8 lg:mt-10 mb-8 lg:mb-10">
                {/* loading state */}
                {loadingProduct && <p>Loading...</p>}

                {/* error state */}
                {loadingProduct === false && !product && (
                    <p>Product not found.</p>
                )}

                {loadingProduct === false && product && (
                    // container
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
                                        alt={product.name}
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
                                    className={`flex items-center justify-between mb-2`}
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
                                    className={`scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight leading-[125%] font-display mb-3`}
                                >
                                    {product.name}
                                </h1>

                                {/* description */}
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
                                                setShowDescription(
                                                    !showDescription
                                                )
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
                                                        <ChevronDown
                                                            size={16}
                                                        />
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

                                {product.delivery_time && (
                                    <p
                                        className={`flex items-center gap-2 pb-2 border-b-2`}
                                    >
                                        <span>
                                            <Truck size={16} />
                                        </span>
                                        <span>{product.delivery_time}</span>
                                    </p>
                                )}

                                {/* more */}
                                <p>
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
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* recommends */}
            <SearchResults
                productsArray={products}
                loading={loadingProducts}
                error={
                    loadingProducts === false && products.length === 0
                        ? "Geen aanbevolen producten gevonden."
                        : ""
                }
                title={"Cadeaus die even leuk zijn 🎁!"}
                productsPerPage={50}
            />
        </SectionLayout>
    );
};

export default Product;
