"use client";

import { CoolblueProductProps } from "@/app/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorageFilters } from "@/hooks/useLocalStorageFilters";
import SearchResults from "./searchResults";

const PopularProducts = () => {
  const [products, setProducts] = useState<CoolblueProductProps[]>([]);
  const localStoredQuery = useLocalStorageFilters(["occasions"]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (localStoredQuery) {
        try {
          // only occasion should be filtered in populair products
          // const response = await axios.post("/api/populair-products", {
          //   query,
          // });
          const response = await axios.post("/api/products", {});
          const popularProducts = response.data.data;

          if (popularProducts.length === 0) {
            const response = await axios.post("/api/products", {});
            const products = response.data;
            setProducts(products);
          } else {
            setProducts(popularProducts);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [localStoredQuery]);

  return (
    <div>
      <SearchResults
        productsArray={products.length > 0 ? products : []}
        loading={false}
        title={`${products.length} populaire cadeaus gevonden 🎁!`}
        subtitle="Hieronder vind je de meest populaire cadeaus van dit moment."
        productsPerPage={75}
      />
    </div>
  );
};

export default PopularProducts;
