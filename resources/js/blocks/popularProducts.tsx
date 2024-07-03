import { useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./searchResults";
import { CoolblueProductProps } from "@/types/types";

const PopularProducts = () => {
    const [products, setProducts] = useState<CoolblueProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const response = await axios.post("/api/populair-products", {
                //   query,
                // });

                const response = await axios.post("/api/products", {});
                const popularProducts = response.data.data;

                if (popularProducts.length === 0) {
                    setLoading(false);
                    setError(
                        "Wij konden geen populaire producten vinden. Probeer de pagina te herladen."
                    );
                } else {
                    setProducts(popularProducts);
                    setLoading(false);
                    setError(null);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
                setError(
                    "Er is iets misgegaan bij het ophalen van de populaire producten. Probeer de pagina te herladen."
                );
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <SearchResults
                productsArray={products.length > 0 ? products : []}
                loading={loading}
                error={error}
                title={
                    loading
                        ? "⏳ Even geduld, we zijn de populaire cadeaus aan het ophalen..."
                        : `${products.length} populaire cadeaus gevonden 🎁!`
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
