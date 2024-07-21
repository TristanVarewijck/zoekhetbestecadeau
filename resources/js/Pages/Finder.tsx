import SectionLayout from "@/Components/custom/sectionLayout";
import SearchMerged from "@/blocks/searchMerged";
import { useState, useEffect } from "react";
import { FilterProps, Gender, Interest, Occasion } from "@/types/types";

interface FinderProps {
    occasions: Occasion[];
    interests: Interest[];
    genders: Gender[];
    delivery: string[];
}

export default function Finder({
    occasions,
    interests,
    delivery,
}: FinderProps) {
    const [query, setQuery] = useState<FilterProps>({});

    console.log(query);
    // fetch products based on the query

    // Load stored filters from local storage on page load
    useEffect(() => {
        const storedOccasions = localStorage.getItem("occasions");
        const storedInterests = localStorage.getItem("interests");
        const storedPrice = localStorage.getItem("price");
        const storedDelivery = localStorage.getItem("delivery");

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

        if (storedPrice) {
            setQuery((prevState) => ({
                ...prevState,
                price: JSON.parse(storedPrice),
            }));
        }

        if (storedDelivery) {
            setQuery((prevState) => ({
                ...prevState,
                delivery: JSON.parse(storedDelivery),
            }));
        }
    }, []);

    return (
        <main
            // hide scrollbar
            style={{ overflow: "hidden" }}
        >
            <SectionLayout bgColor="white">
                <SearchMerged
                    showResults={true}
                    query={query}
                    setQuery={setQuery}
                    occasions={occasions}
                    interests={interests}
                />
            </SectionLayout>
        </main>
    );
}
