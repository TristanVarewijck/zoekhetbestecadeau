"use client";

import SectionLayout from "@/components/custom/sectionLayout";
import SearchMerged from "@/blocks/searchMerged";
import { useState, useEffect } from "react";
import { FilterProps } from "../types";

export default function Finder() {
  const [query, setQuery] = useState<FilterProps>({});

  // Load stored filters from local storage on page load
  useEffect(() => {
    const storedOccasions = localStorage.getItem("occasions");
    const storedInterests = localStorage.getItem("interests");
    const storedGender = localStorage.getItem("gender");
    const storedPrice = localStorage.getItem("price");

    if (storedOccasions) {
      setQuery((prevState) => ({
        ...prevState,
        occasions: JSON.parse(storedOccasions),
      }));
    }

    if (storedInterests) {
      setQuery((prevState) => ({
        ...prevState,
        interests: JSON.parse(storedInterests),
      }));
    }

    if (storedGender) {
      setQuery((prevState) => ({
        ...prevState,
        gender: JSON.parse(storedGender),
      }));
    }

    if (storedPrice) {
      setQuery((prevState) => ({
        ...prevState,
        price: JSON.parse(storedPrice),
      }));
    }
  }, []);

  console.log(query);

  return (
    <main>
      <SectionLayout bgColor="white">
        <SearchMerged showResults={true} query={query} setQuery={setQuery} />
      </SectionLayout>
    </main>
  );
}
