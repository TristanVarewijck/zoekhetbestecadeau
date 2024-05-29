"use client";

import { FilterQueryProps, ProductProps } from "@/app/types";
import SearchCta from "./searchCta";
import SearchResults from "./searchResults";
import { useEffect, useState } from "react";

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
  // useEffect(() => {
  //   const filterKeys = ["occasions", "interests", "gender", "price"];
  //   const filters = filterKeys.map((key) => {
  //     const storedFilters = localStorage.getItem(key);
  //     if (storedFilters) {
  //       const localParsed = JSON.parse(storedFilters);
  //       return { [key]: localParsed };
  //     }
  //   });

  //   setQuery((prevState) => {
  //     return { ...prevState, ...filters };
  //   });
  // }, []);

  useEffect(() => {
    console.log("query", query);
    if (query) {
      // query the (real) products from the server
      setProducts(fakeTestProductsArray);
    }
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
