import { useEffect, useState } from "react";
import H1Heading from "@/Components/custom/heading/h1Heading";
import SectionLayout from "@/Components/custom/sectionLayout";
import Usps from "@/blocks/usps";
import SearchMerged from "@/blocks/searchMerged";
import PopularProducts from "@/blocks/popularProducts";
import { FilterProps, HomeProps } from "@/types/types";
import { Head } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default function Home({ products, occasions, interests }: HomeProps) {
    const [query, setQuery] = useState<FilterProps>({
        occasions: [],
        interests: [],
        price: [],
        delivery: [],
    });

    useEffect(() => {
        const storedOccasions = localStorage.getItem("occasions");
        if (storedOccasions) {
            setQuery({
                occasions: JSON.parse(storedOccasions),
                interests: [],
                price: [],
                delivery: [],
            });
        }
    }, []);

    return (
        <main>
            <Head title="Zoek het beste cadeau in een paar klikken." />
            <SectionLayout bgColor="gray">
                <div className="flex flex-col items-center justify-center">
                    <H1Heading
                        title="Zoek het beste cadeau in een paar klikken."
                        subtitle="Wij zoeken elke dag opnieuw naar nieuwe cadeau ideeën! 🔎"
                        centered
                    />

                    <a
                        href="/products"
                        className="flex items-center gap-1 mt-1  text-[hsl(var(--primary))] font-bold hover:underline"
                    >
                        <span>Of bekijk alle cadeaus</span>
                        <span>
                            <ArrowRight size={16} />
                        </span>
                    </a>

                    <SearchMerged
                        showResults={false}
                        query={query}
                        setQuery={setQuery}
                        occasions={occasions}
                        interests={interests}
                    />
                    <Usps />
                </div>
            </SectionLayout>

            <SectionLayout bgColor="white">
                <PopularProducts products={products} />
            </SectionLayout>
        </main>
    );
}
