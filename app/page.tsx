"use client";
import { useEffect, useState } from "react";

import H1Heading from "@/components/custom/heading/h1Heading";
import SectionLayout from "@/components/custom/sectionLayout";

import PopularProducts from "@/blocks/popularProducts";
import Usps from "@/blocks/usps";
import SearchMerged from "@/blocks/searchMerged";
import { FilterProps } from "./types";

export default function Home() {
  const [query, setQuery] = useState<FilterProps>({});
  console.log(query);

  useEffect(() => {
    const storedOccasions = localStorage.getItem("occasions");
    if (storedOccasions) {
      setQuery({ occasions: JSON.parse(storedOccasions) });
    }
  }, []);

  return (
    <main>
      <SectionLayout bgColor="gray">
        <div>
          <H1Heading
            title="Zoek het beste cadeau in een paar klikken."
            subtitle="Wij zoeken elke dag opnieuw naar nieuwe cadeau ideeën! 🔎"
            centered
          />
          <SearchMerged showResults={false} query={query} setQuery={setQuery} />
          <Usps />
        </div>
      </SectionLayout>

      <SectionLayout bgColor="white">
        <PopularProducts
          occasions={query.occasions}
          occasion={query?.occasions?.[0]}
        />
      </SectionLayout>
    </main>
  );
}
