import { useEffect, useState } from "react";
import axios from "axios";
import { FilterProps } from "@/types/types";

export const useFetchFilterProductsClient = (
    query: FilterProps,
    limit?: number
) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (Object.keys(query).length > 0) {
                setLoading(true);
                try {
                    const response = await axios.post("/api/query", {
                        ...query,
                        limit,
                    });
                    const products = response.data.data;
                    setProducts(products);
                } catch (error) {
                    console.error("Error fetching products:", error);
                    setError("Error fetching products");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProducts();
    }, [query, limit]);

    return { products, loading, error };
};
