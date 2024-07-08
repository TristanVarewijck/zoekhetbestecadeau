import H2Heading from "@/Components/custom/heading/h2Heading";
import SectionLayout from "@/Components/custom/sectionLayout";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { ProductProps } from "@/types/types";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { DotIcon, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const Product = () => {
    const { id } = usePage().props;
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [loadingProduct, setLoadingProduct] = useState(true);

    const retrieveProduct = async () => {
        const response = await axios.get(`/api/products/${id}`, {
            headers: {
                "content-type": "application/json",
            },
        });

        const { data } = response;
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
                                    <span className="font-bold text-xs text-[hsl(var(--primary))]">
                                        Merk:
                                    </span>{" "}
                                    <span className="font-bold text-xs">
                                        {product.brand_name}
                                    </span>
                                </p>

                                {/* serial number */}
                                <p>
                                    <span className="font-bold text-xs text-[hsl(var(--primary))]">
                                        Serial number:
                                    </span>{" "}
                                    <span className="font-bold text-xs">
                                        {product.serial_number}
                                    </span>
                                </p>
                            </div>
                            {/* image */}
                            <a href={product.affiliate_link} target="_blank">
                                <div
                                    className="h-[300px] md:h-[400px] relative"
                                    style={{
                                        objectFit: "contain",
                                        objectPosition: "center",
                                    }}
                                >
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                    />
                                </div>
                            </a>
                            {/* productID */}
                            <div>
                                <p>
                                    <span className="font-bold text-xs text-[hsl(var(--primary))]">
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
                                <p className="flex items-center font-bold text-xs">
                                    <span>
                                        <DotIcon
                                            size={30}
                                            className="text-[hsl(var(--primary))]"
                                        />
                                    </span>
                                    <span>Op voorraad ({product.stock})</span>{" "}
                                </p>

                                {/* name */}
                                <h1
                                    className={`scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight leading-[125%] font-display mb-3`}
                                >
                                    {product.name}
                                </h1>

                                {/* description */}
                                <p className="text-sm">{product.description}</p>
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
                                    className={`flex items-center gap-2 pb-2 border-b-2`}
                                >
                                    <span>Meer details</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>
                Price: {product.price} {product.currency}
            </p> */}
            </div>

            {/* recommends */}
            <div>
                <H2Heading title="Cadeaus die minstens even leuk zijn 🎁!" />
            </div>
        </SectionLayout>
    );
};

export default Product;
