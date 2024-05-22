import { ProductProps } from "@/app/types";
import { Card, CardHeader, CardContent } from "../ui/card";
import H3Heading from "./heading/h3Heading";
import Image from "next/image";

const ProductCard = (product: ProductProps) => {
  return (
    <Card className="bg-white border-none flex flex-col gap-3 shadow-none">
      <CardHeader className="p-0 h-[200px] md:h-[250px] relative">
        <Image
          src={product.image}
          alt={product.title + " " + "product banner"}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </CardHeader>
      <CardContent className="p-0">
        <div>
          <span className="text-xs mb-1">{product.site}</span>
          <H3Heading title={product.title} subtitle={product.description} />
          <span className="font-bold text-xl mt-1">{product.price}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
