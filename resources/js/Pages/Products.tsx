import CheckboxTabs from "@/Components/custom/checkboxTabs";
// import { Datepicker } from "@/Components/custom/datepicker";
import H1Heading from "@/Components/custom/heading/h1Heading";
import H3Heading from "@/Components/custom/heading/h3Heading";
// import RangeSlider from "@/Components/custom/rangeSlider";
import SectionLayout from "@/Components/custom/sectionLayout";
import SearchResults from "@/blocks/searchResults";
import { useFetchFilterProducts } from "@/hooks/useFetchFilterProducts";
import { FilterProps, ProductsProps } from "@/types/types";
import { Head } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Products({
    interests,
    productsCategories,
}: ProductsProps) {
    const [query, setQuery] = useState<FilterProps>({
        interests: [],
        occasions: [],
        price: [],
        delivery: [],
    });
    const { products, loading, error } = useFetchFilterProducts(query);

    useEffect(() => {
        if (productsCategories.category) {
            setQuery((prevState) => ({
                ...prevState,
                interests: [productsCategories.category],
            }));

            return;
        }

        const storedInterests = localStorage.getItem("interests");
        if (storedInterests) {
            setQuery((prevState) => ({
                ...prevState,
                interests: JSON.parse(storedInterests),
            }));

            return;
        }
    }, []);

    return (
        <main>
            <SectionLayout bgColor="white">
                <Head title="Bekijk al onze cadeaus" />

                <div className=" ">
                    <H1Heading
                        title="Bekijk al onze cadeaus 🎁"
                        subtitle="Begin met zoeken naar het perfecte cadeau 🔎"
                    />

                    <a
                        href="/finder"
                        className="flex items-center gap-1 mt-1 w-fit text-[hsl(var(--primary))] font-bold"
                    >
                        <span>Of zoek via onze cadeauzoeker</span>
                        <span>
                            <ArrowRight size={16} />
                        </span>
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 mt-4 lg:mt-6">
                    {/* filters */}
                    <div className="lg:col-span-1">
                        <div
                            className={`flex flex-col gap-4 lg:sticky lg:top-4`}
                        >
                            <div>
                                <H3Heading title="Interesses" />
                                <div className="mt-2">
                                    <CheckboxTabs
                                        checkBoxDataSet={interests}
                                        setData={setQuery}
                                        localStorageKey="interests"
                                        multiple={3}
                                        variant="alternative"
                                        defaultSelectedOptions={query.interests}
                                    />
                                </div>
                            </div>

                            {/* <div>
                                <H3Heading title="Prijs" />
                                <div className="mt-2">
                                    <RangeSlider
                                        min={5}
                                        max={150}
                                        localStorageKey="price"
                                        setData={setQuery}
                                    />
                                </div>
                            </div> */}

                            {/* <div>
                                <H3Heading title="Levertijd" />
                                <div className="mt-2">
                                    <Datepicker
                                        // setData={setData}
                                        localStorageKey="delivery"
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* products section */}
                    <div className="lg:col-span-4">
                        <SearchResults
                            productsArray={products}
                            loading={loading}
                            error={error}
                            productsPerPage={50}
                        />
                    </div>
                </div>
            </SectionLayout>
        </main>
    );
}
