"use client";

import { FilterQueryProps, ProductProps } from "@/app/types";
import SearchCta from "./searchCta";
import SearchResults from "./searchResults";
import { useEffect, useMemo, useState } from "react";
import { getValuesByKeyName } from "@/lib/utils";
import axios from "axios";

interface SearchMergedProps {
  showResults: boolean;
}

// example products
const fakeTestProductsArray: ProductProps[] = [
  {
    id: "1",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "2",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "3",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "4",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "5",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "6",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "7",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
];

const SearchMerged = ({ showResults }: SearchMergedProps) => {
  const [query, setQuery] = useState<FilterQueryProps | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);

  // get local storage filters if available
  useEffect(() => {
    const filterKeys = ["occasions", "interests", "gender", "price"];
    const filters = filterKeys.map((key) => {
      const storedFilters = localStorage.getItem(key);
      if (storedFilters) {
        const localParsed = JSON.parse(storedFilters);
        return { [key]: localParsed };
      }
    });

    setQuery((prevState) => {
      return { ...prevState, ...filters };
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (query) {
        try {
          // Make axios request to the server
          const response = await axios.post("/api/products", { query });
          const products = response.data;

          // Update state with the response data
          setProducts(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div>
      <SearchCta
        showResults={showResults}
        setData={showResults ? setQuery : undefined}
      />
      {showResults && <SearchResults productsArray={products} />}
    </div>
  );
};

export default SearchMerged;