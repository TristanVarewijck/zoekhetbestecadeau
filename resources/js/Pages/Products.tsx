import CheckboxTabs from "@/Components/custom/checkboxTabs";
import H1Heading from "@/Components/custom/heading/h1Heading";
import H2Heading from "@/Components/custom/heading/h2Heading";
import H3Heading from "@/Components/custom/heading/h3Heading";
import RangeSlider from "@/Components/custom/rangeSlider";
import SectionLayout from "@/Components/custom/sectionLayout";
import { Button } from "@/Components/ui/button";
import SearchResults from "@/blocks/searchResults";
import { Interest, Occasion, ProductProps, ProductsProps } from "@/types/types";
import { Head } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

//   case 2:
//             // PRIJS
//             return (
//                 <RangeSlider
//                     min={5}
//                     max={150}
//                     localStorageKey="price"
//                     setData={setData}
//                 />
//             );
//         case 3:
//             // INTERESSES
//             return (
//                 <CheckboxTabs
//                     checkBoxDataSet={interests}
//                     setData={setData}
//                     localStorageKey="interests"
//                     multiple={3}
//                 />
//             );

//         case 4:
//             // LEVERTIJD
//             return (
//                 <Datepicker setData={setData} localStorageKey="delivery" />
//             );
//         // RESULTATEN

export default function Products({
    products,
    occasions,
    interests,
}: ProductsProps) {
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
                        <H2Heading title="Filters" />
                        <div>
                            {/* filter options */}
                            <div>
                                <H3Heading title="Interesse" />
                                <div className="mt-2">
                                    <CheckboxTabs
                                        checkBoxDataSet={interests}
                                        // setData={setData}
                                        localStorageKey="interests"
                                        multiple={3}
                                        variant="alternative"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* products section */}
                    <div className="lg:col-span-4">
                        <SearchResults
                            productsArray={products}
                            loading={false}
                            error={
                                products.length === 0
                                    ? "Geen aanbevolen producten gevonden."
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