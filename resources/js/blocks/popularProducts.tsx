import { useEffect, useState } from "react";
import SearchResults from "./searchResults";
import { ProductProps } from "@/types/types";
import { ArrowRight } from "lucide-react";

interface PopularProductsProps {
    products: ProductProps[];
}

const PopularProducts = ({ products }: PopularProductsProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
        }

        if (products.length === 0) {
            setError(
                "Wij konden geen populaire producten vinden. Probeer de pagina te herladen."
            );
        }
    }, [products]);

    return (
        <div>
            <a
                href="/products"
                className="flex items-center gap-1 mt-1  text-[hsl(var(--primary))] font-bold mb-4 hover:underline"
            >
                <span>Alle cadeaus bekijken</span>
                <span>
                    <ArrowRight size={16} />
                </span>
            </a>
            <SearchResults
                productsArray={products}
                loading={loading}
                showResultsCount={false}
                error={error}
                title={
                    loading
                        ? "⏳ Even geduld, we zijn de populaire cadeaus aan het ophalen..."
                        : `+${products.length} populaire cadeaus gevonden 🎁!`
                }
                subtitle={
                    !loading
                        ? "Hieronder vind je de meest populaire cadeaus van dit moment."
                        : ""
                }
                productsPerPage={50}
            />
        </div>
    );
};

export default PopularProducts;
