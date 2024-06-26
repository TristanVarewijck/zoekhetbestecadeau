"use client";

import { FilterProps } from "@/app/types";
import SearchCta from "./searchCta";
import SearchResults from "./searchResults";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useFetchFilterProducts } from "@/hooks/useFetchFilterProducts";
import { useLocalStorageFilters } from "@/hooks/useLocalStorageFilters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ArrowUp, Check, CircleDashed } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/custom/scrollToTopButton";

interface SearchMergedProps {
  showResults: boolean;
  query?: FilterProps;
  setQuery?: Dispatch<SetStateAction<FilterProps | {}>>;
}

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
    id: "forWho",
    step: 4,
    questionType: "Voor wie",
  },
  {
    id: "Results",
    step: 5,
    questionType: "Resultaten",
  },
];

// voor hem, voor haar, voor iedereen
const SearchMerged = ({ showResults, query, setQuery }: SearchMergedProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const localStoredQuery = useLocalStorageFilters([
    "occasions",
    "interests",
    "forWho",
    "price",
  ]);

  const newQuery = query || localStoredQuery;

  const { products, loading, error } = useFetchFilterProducts(newQuery);

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
    <div className="flex flex-col items-center gap-1 w-full mt-8 lg:mt-10">
      {showResults && (
        <div className="flex-col flex md:flex-row items-end md:items-center gap-2 mb-3">
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
              <div className={`grid grid-cols-2 gap-2 md:flex md:flex-row`}>
                {questions.map((question) => (
                  <TabsTrigger
                    key={question.step}
                    value={question.questionType}
                    className={` flex items-start justify-center w-full h-full ${
                      question.step === 5 && "hidden"
                    }`}
                  >
                    <span
                      className="w-full h-full text-center font-bold
                cursor-pointer flex items-center justify-center gap-1
                "
                    >
                      <span>{question.questionType}</span>
                      <span>
                        {queryKeysLength.includes(question.id) ? (
                          <Check className="ml-1" size={16} />
                        ) : (
                          <CircleDashed className="ml-1" size={16} />
                        )}
                      </span>
                    </span>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>

          {queryKeysLength.length === 4 && currentStep !== 4 && (
            <Button
              onClick={() => {
                localStorage.setItem("currentStep", "5");
                setCurrentStep(5);
              }}
            >
              <span className="w-full text-center font-bold">
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
            <span className="text-center font-bold">
              Stappen voltooid: {queryKeysLength.length}/{questions.length - 1}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <SearchCta
              showResults={showResults}
              setData={setQuery}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-4 lg:mt-6 w-full results">
        {showResults && (
          <SearchResults
            productsArray={products}
            loading={loading}
            error={error}
            title={
              loading
                ? "⏳ Even geduld, we zijn de beste cadeau matches aan het ophalen..."
                : `Dit zijn de ${products.length} beste cadeau matches! 🎉`
            }
            subtitle={"Blijf filteren om betere cadeau's te krijgen 🔎"}
            productsPerPage={25}
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
