"use client";

import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Home, RefreshCw } from "lucide-react";
import CheckboxTabs from "@/components/custom/checkboxTabs";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import H3Heading from "@/components/custom/heading/h3Heading";
import { useRouter } from "next/navigation";
import RangeSlider from "@/components/custom/rangeSlider";
import { nextStepHandler } from "@/lib/utils";
import { FilterProps } from "@/app/types";

// promotional occasions (e.g. Christmas, Valentine's Day)
// const holidayOccasions = [
//   { icon: "💕", name: "Valentijn", id: "valentijn" },
//   {
//     icon: "🎄",
//     name: "Kerst",
//     id: "kerst",
//   },
//   {
//     icon: "🎁",
//     name: "Sinterklaas",
//     id: "sinterklaas",
//   },
//   {
//     icon: "🐰",
//     name: "Pasen",
//     id: "pasen",
//   },
//   {
//     icon: "🎃",
//     name: "Halloween",
//     id: "halloween",
//   },
//   {
//     icon: "🎉",
//     name: "Oud & Nieuw",
//     id: "oudnieuw",
//   },
// ];

const specialOccasions = [
  {
    icon: "🌹",
    name: "Date",
    id: "date",
  },
  {
    icon: "🧁",
    name: "Verjaardag",
    id: "verjaardag",
  },
  {
    icon: "🙏",
    name: "Bedankje",
    id: "bedankje",
  },
  {
    icon: "👋",
    name: "Vertrek",
    id: "vertrek",
  },
  {
    icon: "🏡",
    name: "Housewarming",
    id: "housewarming",
  },
  {
    icon: "🎓",
    name: "Diploma",
    id: "diploma",
  },
  {
    icon: "👶",
    name: "Geboorte",
    id: "geboorte",
  },
  {
    icon: "🎓",
    name: "Pensioen",
    id: "pensioen",
  },
  {
    icon: "🎊",
    name: "Jubileum",
    id: "jubileum",
  },
  {
    icon: "👰",
    name: "Bruiloft",
    id: "bruiloft",
  },
];

const interests = [
  {
    icon: "🏋️",
    name: "Sport",
    id: "sport",
  },
  {
    icon: "📚",
    name: "Lezen",
    id: "lezen",
  },
  {
    icon: "🧣",
    name: "Fashion",
    id: "fashion",
  },
  {
    icon: "🥘",
    name: "Koken",
    id: "koken",
  },
  {
    icon: "✈️",
    name: "Reizen",
    id: "reizen",
  },
  {
    icon: "💻",
    name: "Tech",
    id: "tech",
  },
  {
    icon: "🏡",
    name: "Interieur",
    id: "interieur",
  },
  {
    icon: "🎊",
    name: "Feesten",
    id: "feesten",
  },
  {
    icon: "🎧",
    name: "Muziek",
    id: "muziek",
  },
  {
    icon: "🍀",
    name: "Natuur",
    id: "natuur",
  },
];

const gender = [
  {
    icon: "🚺",
    name: "Vrouwelijk",
    id: "vrouwelijk",
  },
  {
    icon: "🚹",
    name: "Mannelijk",
    id: "mannelijk",
  },
  {
    icon: "🚻",
    name: "Unisex",
    id: "unisex",
  },
];

const content = [
  {
    label: "Gelegenheid",
    title: "Kies de gelegenheid",
    subtitle: "Wat is de gelegenheid waarvoor je een cadeau zoekt?",
  },
  {
    label: "Interesses",
    title: "Wat zijn de interesses?",
    subtitle:
      "Wat zijn de interesses van de persoon voor wie je een cadeau zoekt?",
  },
  {
    label: "Geslacht",
    title: "Wat voor soort cadeau zoek je?",
    subtitle:
      "Wat is het geslacht van de persoon voor wie je een cadeau zoekt?",
  },
  {
    label: "Prijs",
    title: "Wat is het budget voor het cadeau?",
    subtitle: "Selecteer je budget voor het cadeau.",
  },
  {
    label: "Resultaten",
    title: "Dit zijn de cadeaus die bij de persoon passen!",
    subtitle:
      "Hieronder vind je de cadeaus die wij gevonden hebben, refresh om nieuwe cadeaus te zien",
  },
];

const SearchCta = ({
  setData,
  showResults,
}: {
  setData?: Dispatch<SetStateAction<FilterProps | {}>>;
  showResults: boolean;
}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // render content based on the current step
  const filterInput = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          // GELEGENHEDEN
          <CheckboxTabs
            checkBoxDataSet={specialOccasions}
            setData={setData}
            localStorageKey="occasions"
          />
        );

      case 2:
        // INTERESSES
        return (
          <CheckboxTabs
            checkBoxDataSet={interests}
            setData={setData}
            localStorageKey="interests"
            multiple
          />
        );
      case 3:
        // GESLACHT
        return (
          <CheckboxTabs
            checkBoxDataSet={gender}
            setData={setData}
            localStorageKey="gender"
          />
        );
      case 4:
        // PRIJS
        return (
          <RangeSlider
            min={5}
            max={150}
            localStorageKey="price"
            setData={setData}
          />
        );
      // RESULTATEN
      default:
        return (
          <div className="flex gap-4 justify-center">
            <Button
              variant="default"
              onClick={() => {
                localStorage.setItem("currentStep", "1");
                setCurrentStep(1);
              }}
            >
              Refresh de resultaten
              <RefreshCw size={16} className="ml-1" />
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                localStorage.setItem("currentStep", "1");
                setCurrentStep(1);
              }}
            >
              Opnieuw beginnen
              <Home size={16} className="ml-1" />
            </Button>
          </div>
        );
    }
  }, [currentStep, setData, showResults]);

  // get the current step from local storage
  useEffect(() => {
    const storedStep = localStorage.getItem("currentStep");
    if (storedStep) {
      const step = parseInt(storedStep);
      if (step < 1) {
        setCurrentStep(1);
      } else {
        setCurrentStep(step);
      }
    }
  }, []);

  return (
    <div className="relative flex justify-center flex-col mb-10 mt-5 lg:md:w-2/3 md:mx-auto rounded-2xl bg-white border-2 gap-4 h-auto p-6 lg:p-10 shadow-md">
      {/* navigation */}
      {showResults && (
        <div className="flex items-center">
          {currentStep > 1 && (
            <Button
              className="mr-auto"
              variant="secondary"
              onClick={() => {
                localStorage.setItem(
                  "currentStep",
                  (currentStep - 1).toString()
                );

                if (currentStep === 2) {
                  router.push("/");
                } else {
                  setCurrentStep((prevState) => prevState - 1);
                }
              }}
            >
              <ArrowLeft size={16} className="mr-1" />
              {content[currentStep - 2].label}
            </Button>
          )}

          {content.length !== currentStep && (
            <Button
              className="ml-auto"
              variant="secondary"
              onClick={() => {
                setCurrentStep((prevState) => prevState + 1);
                localStorage.setItem(
                  "currentStep",
                  (currentStep + 1).toString()
                );
              }}
            >
              {content[currentStep].label}
              <ArrowRight size={16} className="ml-1" />
            </Button>
          )}
        </div>
      )}

      <H3Heading
        title={content[currentStep - 1].title}
        subtitle={content[currentStep - 1].subtitle}
        centered
      />

      {/* dynamically based on input */}
      {filterInput}

      {currentStep !== 5 && (
        <Button
          variant={"default"}
          className="flex items-center justify-center gap-2"
          onClick={() => {
            const nextStep = nextStepHandler(currentStep, showResults);
            if (nextStep === "redirect") {
              router.push("/finder");
            } else {
              setCurrentStep(nextStep);
            }
          }}
        >
          <span>
            {currentStep === 1 && !showResults
              ? "Start met zoeken"
              : content[currentStep].label}
          </span>
          <ArrowRight size={18} />
        </Button>
      )}
    </div>
  );
};

export default SearchCta;
