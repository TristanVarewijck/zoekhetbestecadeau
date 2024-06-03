import { useEffect, useState } from "react";
import axios from "axios";
import { FilterProps } from "@/app/types";

export const useFetchProducts = (query: FilterProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (Object.keys(query).length > 0) {
        setLoading(true);
        try {
          const response = await axios.post("/api/products", query);
          const products = response.data;

          setProducts(products);
        } catch (error) {
          setError("Error fetching products");
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [query]);

  return { products, loading, error };
};
