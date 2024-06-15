"use client";

import { FilterProps } from "@/app/types";
import SearchCta from "./searchCta";
import SearchResults from "./searchResults";
import {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useLocalStorageFilters } from "@/hooks/useLocalStorageFilters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const { products, loading, error } = useFetchProducts(newQuery);

  const queryKeysLength = useMemo(() => {
    return Object.keys(newQuery || {}).filter(
      // @ts-ignore - fix this (weird typing issue)
      (key) => Array.isArray(newQuery[key]) && newQuery[key].length >= 1
    );
  }, [newQuery]);

  // STATES <-- uncomment to see the values
  // console.log(loading);
  // console.log(error)

  useEffect(() => {
    if (!showResults) {
      setCurrentStep(1);
      return;
    }
  }, [showResults]);

  return (
    <div className="flex flex-col items-center gap-1 w-full ">
      {showResults && (
        <div className="flex items-center gap-2 mb-3">
          <Tabs
            value={questions[currentStep - 1].questionType}
            className={`flex justify-center`}
            onValueChange={(value) => {
              const currentStep = questions.find(
                (question) => question.questionType === value
              );

              // in loxal storage
              localStorage.setItem(
                "currentStep",
                currentStep?.step.toString() || "1"
              );

              setCurrentStep(currentStep?.step || 1);
            }}
          >
            <TabsList>
              {questions.map((question) => (
                <TabsTrigger
                  key={question.step}
                  value={question.questionType}
                  className={`${question.step === 5 && "hidden"}`}
                >
                  <span
                    className="w-full h-full text-center font-bold
                cursor-pointer flex items-center justify-center gap-1
                "
                  >
                    <span>{question.questionType}</span>
                    <span>
                      {queryKeysLength.includes(question.id) && (
                        <Check className="ml-2" size={16} />
                      )}
                    </span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {queryKeysLength.length === 4 && (
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
        className="w-full"
      >
        <AccordionItem value="item-1" className={`border-none`}>
          <AccordionTrigger
            className={`${
              !showResults ? "hidden" : ""
            }  border-gray-200 border px-6 rounded-[6px] shadow-sm h-[50px]`}
          >
            <span className="w-full text-center font-bold">
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

      <div className="mt-4 lg:mt-6">
        {showResults && <SearchResults productsArray={products} />}
      </div>
    </div>
  );
};

export default SearchMerged;
