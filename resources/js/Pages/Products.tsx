import CheckboxTabs from "@/Components/custom/checkboxTabs";
import H1Heading from "@/Components/custom/heading/h1Heading";
import H3Heading from "@/Components/custom/heading/h3Heading";
import SectionLayout from "@/Components/custom/sectionLayout";
import SearchResults from "@/blocks/searchResults";
import { ProductsProps } from "@/types/types";
import { Head } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Products({
    products,
    interests,
    productsCategories,
}: ProductsProps) {
    const [query, setQuery] = useState({
        interests: {},
        occasions: [],
        price: [],
        delivery: [],
    });

    const [selectedCategories, setSelectedCategories] = useState(() => {
        return JSON.parse(localStorage.getItem("interests") as string) || [];
    });

    console.log(selectedCategories);

    useEffect(() => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            interests: selectedCategories,
        }));
    }, [selectedCategories]);

    useEffect(() => {
        if (productsCategories.categoryIds) return;
        const updateURL = () => {
            let url = "/products?";

            if (
                query.interests.categoryIds &&
                query.interests.categoryIds.length > 0
            ) {
                url += `category_id=${query.interests.categoryIds.join(",")}&`;
            }

            if (
                query.interests.subCategoryIds &&
                Object.keys(query.interests.subCategoryIds).length > 0
            ) {
                for (const [key, value] of Object.entries(
                    query.interests.subCategoryIds
                )) {
                    url += `sub_category_id[${key}]=${value.join(",")}&`;
                }
            }

            window.location.replace(url);
        };

        if (
            (query.interests.categoryIds &&
                query.interests.categoryIds.length > 0) ||
            (query.interests.subCategoryIds &&
                Object.keys(query.interests.subCategoryIds).length > 0)
        ) {
            const timer = setTimeout(updateURL, 300);

            return () => clearTimeout(timer);
        }
    }, [query.interests.categoryIds, query.interests.subCategoryIds]);

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
                        href="/"
                        className="flex items-center gap-1 mt-1 w-fit text-[hsl(var(--primary))] font-bold hover:underline"
                    >
                        <span>Of zoek via onze cadeauzoeker</span>
                        <span>
                            <ArrowRight size={16} />
                        </span>
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 mt-4 lg:mt-6">
                    <div className="lg:col-span-1">
                        <div className={`flex flex-col gap-4`}>
                            <div>
                                <H3Heading title="Interesses" />
                                <div className="mt-2">
                                    <CheckboxTabs
                                        checkBoxDataSet={interests || []}
                                        setData={setSelectedCategories}
                                        localStorageKey="interests"
                                        multiple={3}
                                        variant="alternative"
                                        defaultSelectedOptions={
                                            selectedCategories
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <SearchResults
                            showResultsCount={false}
                            productsArray={products}
                            loading={false}
                            error={
                                products.length === 0
                                    ? "Geen resultaten gevonden"
                                    : ""
                            }
                            productsPerPage={50}
                        />
                    </div>
                </div>
            </SectionLayout>
        </main>
    );
}
