import { CoolblueProductProps } from "@/app/types";
import { Card, CardHeader, CardContent } from "../ui/card";
import Image from "next/image";
import getSymbolFromCurrency from "currency-symbol-map";

const ProductCard = (product: CoolblueProductProps) => {
  return (
    <Card className="bg-white border-none flex flex-col gap-3 shadow-none">
      <CardHeader className="p-0 h-[150px] md:h-[200px] relative">
        <Image
          src={product.image_url || "/images/placeholder.png"}
          alt={product.product_name + " " + "product banner"}
          fill
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </CardHeader>
      <CardContent className="p-0">
        <div>
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
            <span>{product.brand}</span>
            {/* name */}
            <h4 className="text-lg font-semibold  mt-1">
              {product.product_name}
            </h4>
          </div>

          {/* pricing */}
          <div className="flex items-baseline gap-3">
            {/* price */}
            <span className="font-bold text-xl mt-1">
              {getSymbolFromCurrency(product.currency)}
              {product.price},-
            </span>

            {/* before price */}
            {product.beforeprice && (
              <span className={`line-through`}>
                {" "}
                {getSymbolFromCurrency(product.currency)}
                {product.beforeprice},-
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
