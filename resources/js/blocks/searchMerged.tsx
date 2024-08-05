import SearchCta from "./searchCta";
import SearchResults from "./searchResults";
import { useEffect, useMemo, useState } from "react";
import { useFetchFilterProductsClient } from "@/hooks/useFetchFilterProductsClient";
import { useLocalStorageFilters } from "@/hooks/useLocalStorageFilters";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { ArrowRight, Check, CircleDashed } from "lucide-react";
import { Button } from "@/Components/ui/button";
import ScrollToTopButton from "@/Components/custom/scrollToTopButton";
import { SearchMergedProps } from "@/types/types";

const questions = [
    {
        id: "occasions",
        step: 1,
        questionType: "Gelegendheid",
    },
    {
        id: "price",
        step: 2,
        questionType: "Prijs",
    },
    {
        id: "interests",
        step: 3,
        questionType: "Interesses",
    },
    {
        id: "delivery",
        step: 4,
        questionType: "Levering",
    },
    {
        id: "Results",
        step: 5,
        questionType: "Resultaten",
    },
];

const SearchMerged = ({
    showResults,
    query,
    setQuery,
    occasions,
    interests,
}: SearchMergedProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const localStoredQuery = useLocalStorageFilters([
        "occasions",
        "interests",
        "price",
        "delivery",
    ]);

    const newQuery = query || localStoredQuery;

    const { products, loading, error } = useFetchFilterProductsClient(
        newQuery,
        1000
    );

    const queryKeysLength = useMemo(() => {
        return Object.keys(newQuery || {}).filter(
            // @ts-ignore - fix this (weird typing issue)
            (key) => Array.isArray(newQuery[key]) && newQuery[key].length >= 1
        );
    }, [newQuery]);

    useEffect(() => {
        if (!showResults) {
            localStorage.setItem("currentStep", "1");
            setCurrentStep(1);
            return;
        }
    }, [showResults]);

    return (
        <div className="flex flex-col items-center w-full gap-1 mt-8 lg:mt-10">
            {showResults && (
                <div className="flex flex-col items-end gap-2 mb-3 md:flex-row md:items-center">
                    <Tabs
                        value={questions[currentStep - 1].questionType}
                        className={`flex justify-center`}
                        onValueChange={(value) => {
                            const currentStep = questions.find(
                                (question) => question.questionType === value
                            );

                            localStorage.setItem(
                                "currentStep",
                                currentStep?.step.toString() || "1"
                            );

                            setCurrentStep(currentStep?.step || 1);
                        }}
                    >
                        <TabsList className={`w-full h-auto overflow-auto`}>
                            <div
                                className={`grid grid-cols-2 gap-2 md:flex md:flex-row`}
                            >
                                {questions.map((question) => (
                                    <TabsTrigger
                                        key={question.step}
                                        value={question.questionType}
                                        className={`flex items-start justify-center w-full h-full ${
                                            question.step === 5 && "hidden"
                                        }`}
                                    >
                                        <span className="flex items-center justify-center w-full h-full gap-1 font-bold text-center cursor-pointer ">
                                            <span>{question.questionType}</span>
                                            <span>
                                                {queryKeysLength.includes(
                                                    question.id
                                                ) ? (
                                                    <Check
                                                        className="ml-1"
                                                        size={16}
                                                    />
                                                ) : (
                                                    <CircleDashed
                                                        className="ml-1"
                                                        size={16}
                                                    />
                                                )}
                                            </span>
                                        </span>
                                    </TabsTrigger>
                                ))}
                            </div>
                        </TabsList>
                    </Tabs>

                    {queryKeysLength.length === 4 && (
                        <Button
                            onClick={() => {
                                localStorage.setItem("currentStep", "5");
                                setCurrentStep(5);
                            }}
                        >
                            <span className="w-full font-bold text-center">
                                Resultaten 🎉
                            </span>

                            <span>
                                <ArrowRight className="ml-2" size={16} />
                            </span>
                        </Button>
                    )}
                </div>
            )}

            <Accordion
                type="single"
                collapsible={!showResults ? false : true}
                defaultValue="item-1"
                value={currentStep === 5 ? "item-1" : undefined}
                className="w-full lg:w-2/3"
            >
                <AccordionItem value="item-1" className={`border-none`}>
                    <AccordionTrigger
                        className={`${
                            !showResults ? "hidden" : ""
                        }  border-gray-200 border-t-2 border-l-2 border-r-2 border-b-2 px-6 rounded-t-[6px] shadow-sm h-[50px]`}
                    >
                        <span className="font-bold text-center">
                            Stappen voltooid: {queryKeysLength.length}/
                            {questions.length - 1}
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <SearchCta
                            showResults={showResults}
                            setData={setQuery}
                            setCurrentStep={setCurrentStep}
                            currentStep={currentStep}
                            occasions={occasions}
                            interests={interests}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="w-full mt-4 lg:mt-6 results">
                {showResults && (
                    <SearchResults
                        productsArray={products}
                        loading={loading}
                        error={error}
                        showResultsCount={false}
                        title={
                            loading
                                ? "⏳ Even geduld, we zijn de beste cadeau matches aan het ophalen..."
                                : `Dit zijn de ${
                                      products.length >= 1000
                                          ? "+ 1000"
                                          : products.length
                                  } cadeau's die we voor je hebben gevonden! 🎉
                                  `
                        }
                        subtitle={
                            "Blijf filteren om betere cadeau's te krijgen 🔎"
                        }
                        productsPerPage={50}
                    />
                )}
            </div>

            {/* floating button that scrolls back to top  */}
            {/* not working properly yet.. :( */}
            {showResults && <ScrollToTopButton targetClassName="results" />}
        </div>
    );
};

export default SearchMerged;
