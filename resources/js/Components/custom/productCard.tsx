import { ProductProps } from "@/types/types";
import { Card, CardHeader, CardContent } from "../ui/card";
import getSymbolFromCurrency from "currency-symbol-map";
import { ImageOff } from "lucide-react";

const ProductCard = (product: ProductProps) => {
    return (
        <Card className="flex flex-col h-full gap-3 p-4 bg-white border shadow-none lg:border-none lg:p-0">
            <CardHeader className="p-0">
                {/* image */}
                <div className="h-[150px] md:h-[200px] relative">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            style={{
                                objectFit: "contain",
                                objectPosition: "center",
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-200">
                            <ImageOff size={64} className="text-gray-500" />
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className={`flex flex-col gap-2`}>
                    {/* {product.beforeprice && (
                        <div
                            className={`bg-red-500 text-white text-xs font-semibold rounded-md py-1 px-2 w-fit`}
                        >
                            {"-" +
                                Math.round(
                                    ((product.beforeprice - product.price) /
                                        product.beforeprice) *
                                        100
                                ) +
                                "%"}
                        </div>
                    )} */}

                    <div>
                        {product.name && (
                            <h4 className="text-lg font-bold font-display">
                                {product.name}
                            </h4>
                        )}
                    </div>

                    {/* pricing */}
                    <div className="flex items-baseline gap-2">
                        {/* price */}
                        {product.price && (
                            <span className="text-2xl font-bold font-display">
                                {getSymbolFromCurrency(product.currency)}
                                {product.price},-
                            </span>
                        )}

                        {/* {product.beforeprice && (
                            <span className={`line-through`}>
                                {" "}
                                {getSymbolFromCurrency(product.currency)}
                                {product.beforeprice},-
                            </span>
                        )} */}
                    </div>

                    {/* {(product.reviewsaveragescore ||
                        product.reviewscount !== 0) && (
                        <div className={`flex items-center gap-1`}>
                            <div className="flex items-center gap-1">
                                <Star
                                    size={14}
                                    strokeWidth={3}
                                    className="text-yellow-500 fill-yellow-500"
                                />
                                <span className="text-sm text-gray-500">
                                    {product.reviewsaveragescore}/10
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                ({product.reviewscount} reviews)
                            </span>
                        </div>
                    )} */}

                    {/* shipping */}
                    {product.delivery_time && (
                        <span className="text-sm font-semibold">
                            {product.delivery_time}.
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
