import SectionLayout from "@/Components/custom/sectionLayout";
import SearchMerged from "@/blocks/searchMerged";
import { useState, useEffect } from "react";
import { FilterProps } from "@/types/types";

export default function Finder() {
    const [query, setQuery] = useState<FilterProps>({});

    // Load stored filters from local storage on page load
    useEffect(() => {
        const storedOccasions = localStorage.getItem("occasions");
        const storedInterests = localStorage.getItem("interests");
        const storedForWho = localStorage.getItem("forWho");
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

        if (storedForWho) {
            setQuery((prevState) => ({
                ...prevState,
                forWho: JSON.parse(storedForWho),
            }));
        }

        if (storedPrice) {
            setQuery((prevState) => ({
                ...prevState,
                price: JSON.parse(storedPrice),
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
                />
            </SectionLayout>
        </main>
    );
}
