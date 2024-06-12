"use client";

import { FilterProps } from "@/app/types";
import SearchCta from "./searchCta";
import SearchResults from "./searchResults";
import { Dispatch, SetStateAction, useState } from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useLocalStorageFilters } from "@/hooks/useLocalStorageFilters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SearchMergedProps {
  showResults: boolean;
  query?: FilterProps;
  setQuery?: Dispatch<SetStateAction<FilterProps | {}>>;
}

const SearchMerged = ({ showResults, query, setQuery }: SearchMergedProps) => {
  const maxQuestions = 4;
  const localStoredQuery = useLocalStorageFilters([
    "occasions",
    "interests",
    "gender",
    "price",
  ]);
  console.log(localStoredQuery);
  console.log(query);

  const newQuery = query || localStoredQuery;
  console.log(newQuery);
  const queryKeysLength = Object.keys(newQuery || {}).filter(
    // @ts-ignore - fix this (weird typing issue)
    (key) => Array.isArray(newQuery[key]) && newQuery[key].length >= 1
  ).length; // check if each key has a array value with at least 1 item

  const { products, loading, error } = useFetchProducts(newQuery);
  console.log(loading);
  console.log(error);
  console.log(products);
  return (
    <div>
      <Accordion
        type="single"
        collapsible={!showResults ? false : true}
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className={`border-none`}>
          <AccordionTrigger
            className={`${
              !showResults ? "hidden" : ""
            } bg-primary text-white px-6 rounded-[6px] h-[50px] mb-8`}
          >
            <span className="w-full text-center font-bold">
              Stappen voltooid: {queryKeysLength}/{maxQuestions}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <SearchCta
              showResults={showResults}
              setData={setQuery}
              data={query}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {showResults && <SearchResults productsArray={products} />}
    </div>
  );
};

export default SearchMerged;
