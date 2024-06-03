"use client";

import { FilterProps } from "@/app/types";
import SearchCta from "./searchCta";
import SearchResults from "./searchResults";
import { Dispatch, SetStateAction, useState } from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useLocalStorageFilters } from "@/hooks/useLocalStorageFilters";

interface SearchMergedProps {
  showResults: boolean;
  query?: FilterProps;
  setQuery?: Dispatch<SetStateAction<FilterProps | {}>>;
}

const SearchMerged = ({ showResults, query, setQuery }: SearchMergedProps) => {
  const localStoredQuery = useLocalStorageFilters([
    "occasions",
    "interests",
    "gender",
    "price",
  ]);

  const newQuery = query || localStoredQuery;
  const { products, loading, error } = useFetchProducts(newQuery);

  console.log(loading);
  console.log(error);

  return (
    <div>
      <SearchCta showResults={showResults} setData={setQuery} />
      {showResults && <SearchResults productsArray={products} />}
    </div>
  );
};

export default SearchMerged;
