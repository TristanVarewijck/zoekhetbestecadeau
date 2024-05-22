"use client";

import { ProductProps } from "@/app/types";
import SearchCta from "./searchCta";
import SearchResults from "./searchResults";
import { useState } from "react";

interface SearchMergedProps {
  showResults: boolean;
}

// example products
const fakeTestProductsArray: ProductProps[] = [
  {
    id: "1",
    site: "Amazon",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "2",
    site: "Amazon",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "3",
    site: "Amazon",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "4",
    site: "Amazon",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "5",
    site: "Amazon",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "6",
    site: "Amazon",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "7",
    site: "Amazon",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
];

const SearchMerged = ({ showResults }: SearchMergedProps) => {
  const [query, setQuery] = useState([""]);
  console.log(query);

  return (
    <div>
      <SearchCta
        showResults={showResults}
        setData={showResults ? setQuery : undefined}
      />
      {showResults && <SearchResults productsArray={fakeTestProductsArray} />}
    </div>
  );
};

export default SearchMerged;
