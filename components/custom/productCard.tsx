import { CoolblueProductProps } from "@/app/types";
import { Card, CardHeader, CardContent } from "../ui/card";
import Image from "next/image";
import getSymbolFromCurrency from "currency-symbol-map";
import { ImageOff, Star } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

<div className="flex flex-col space-y-3">
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>;

const ProductCardLoading = () => {
  return (
    <Card className="bg-white  border p-4 lg:border-none lg:p-0 h-full flex flex-col gap-3 shadow-none">
      <CardHeader className="p-0 h-[150px] md:h-[200px] relative">
        <Skeleton className="w-full h-full" />
      </CardHeader>
      <CardContent className="p-0">
        <div className={`flex flex-col gap-2`}>
          {/* brand */}
          <Skeleton className="h-4 w-[75px]" />
          {/* name */}
          <Skeleton className="h-4 w-full" />
          {/* price */}
          <Skeleton className="h-4 w-[125px]" />
          {/* rating */}
          <Skeleton className="h-4 w-full" />
          {/* shipping */}
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

const ProductCard = (product: CoolblueProductProps) => {
  return (
    <Card className="bg-white border p-4 lg:border-none lg:p-0 h-full flex flex-col gap-3 shadow-none">
      <CardHeader className="p-0 h-[150px] md:h-[200px] relative">
        {/* image */}
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.product_name}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : (
          <div
            className="w-full h-full bg-gray-200
          flex items-center justify-center
          "
          >
            <ImageOff size={64} className="text-gray-500" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className={`flex flex-col gap-2`}>
          {/* dicount percentage */}
          {product.beforeprice && (
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
          )}

          {/* product */}
          <div>
            {/* brand */}
            {product.brand && (
              <span className={`text-xs font-semibold text-gray-500 `}>
                {product.brand}
              </span>
            )}

            {/* name */}
            {product.product_name && (
              <h4 className="text-lg font-semibold">{product.product_name}</h4>
            )}
          </div>

          {/* pricing */}
          <div className="flex items-baseline gap-2">
            {/* price */}
            {product.price && (
              <span className="font-bold text-2xl">
                {getSymbolFromCurrency(product.currency)}
                {product.price},-
              </span>
            )}

            {/* before price */}
            {product.beforeprice && (
              <span className={`line-through`}>
                {" "}
                {getSymbolFromCurrency(product.currency)}
                {product.beforeprice},-
              </span>
            )}
          </div>

          {/* rating  */}
          {(product.reviewsaveragescore || product.reviewscount !== 0) && (
            <div className={`flex items-center gap-1`}>
              {/* score */}
              <div className="flex items-center gap-1">
                <Star
                  // fill="yellow-500"
                  size={14}
                  strokeWidth={3}
                  className="text-yellow-500 fill-yellow-500"
                />
                <span className="text-sm text-gray-500">
                  {product.reviewsaveragescore}/10
                </span>
              </div>
              {/* reviews */}
              <span className="text-sm text-gray-500 underline">
                ({product.reviewscount} reviews)
              </span>
            </div>
          )}

          {/* shipping */}
          {product.delivery_time && (
            <span className="text-sm text-gray-500">
              {product.delivery_time}.
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { ProductCard, ProductCardLoading };
