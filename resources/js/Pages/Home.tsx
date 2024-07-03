import { useEffect, useState } from "react";
import H1Heading from "@/Components/custom/heading/h1Heading";
import SectionLayout from "@/Components/custom/sectionLayout";
import Usps from "@/blocks/usps";
import SearchMerged from "@/blocks/searchMerged";
import PopularProducts from "@/blocks/popularProducts";
import { FilterProps } from "@/types/types";

export default function Home() {
    const [query, setQuery] = useState<FilterProps>({});

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
                    <SearchMerged
                        showResults={false}
                        query={query}
                        setQuery={setQuery}
                    />
                    <Usps />
                </div>
            </SectionLayout>

            <SectionLayout bgColor="white">
                <PopularProducts />
            </SectionLayout>
        </main>
    );
}
