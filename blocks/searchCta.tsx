"use client";

import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Home, RefreshCw } from "lucide-react";
import CheckboxTabs from "@/components/custom/checkboxTabs";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import H3Heading from "@/components/custom/heading/h3Heading";
import { useRouter } from "next/navigation";
import RangeSlider from "@/components/custom/rangeSlider";
import { FilterProps } from "@/app/types";
import Image from "next/image";

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

const forWho = [
  {
    icon: "🚺",
    name: "Voor haar",
    id: "voor_haar",
  },
  {
    icon: "🚹",
    name: "Voor hem",
    id: "voor_hem",
  },
  {
    icon: "🚻",
    name: "Voor iedereen",
    id: "voor_iedereen",
  },
];

const content = [
  {
    label: "Gelegenheid",
    title: "Kies de gelegenheid",
    subtitle: "Selecteer de gelegenheid waarvoor je een cadeau zoekt.",
  },
  {
    label: "Prijs",
    title: "Wat is het budget voor het cadeau?",
    subtitle: "Selecteer je budget voor het cadeau.",
  },
  {
    label: "Interesses",
    title: "Wat zijn de interesses?",
    subtitle:
      "Selecteer de interesses van de persoon waarvoor je een cadeau zoekt.",
  },
  {
    label: "Voor wie",
    title: "Voor wie is het cadeau?",
    subtitle: "Selecteer de optie die het beste past.",
  },

  {
    label: "Resultaten 🎉",
    title: "Dit zijn de cadeaus die wij gevonden hebben",
    subtitle:
      "Wij hopen dat je een leuk cadeau hebt gevonden. Veel plezier met geven!",
  },
];

const SearchCta = ({
  setData,
  setCurrentStep,
  currentStep,
  showResults,
}: {
  setData?: Dispatch<SetStateAction<FilterProps | {}>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
  showResults: boolean;
}) => {
  const router = useRouter();
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
        // PRIJS
        return (
          <RangeSlider
            min={5}
            max={150}
            localStorageKey="price"
            setData={setData}
          />
        );

      case 3:
        // INTERESSES
        return (
          <CheckboxTabs
            checkBoxDataSet={interests}
            setData={setData}
            localStorageKey="interests"
            multiple
          />
        );

      case 4:
        // GESLACHT
        return (
          <CheckboxTabs
            checkBoxDataSet={forWho}
            setData={setData}
            localStorageKey="forWho"
          />
        );

      // RESULTATEN
      default:
        return (
          <div>
            {/* filters overview clickable to go back to the step */}
            <div>
              <div></div>
              <Image
                src="/images/woman_and_daughter.svg"
                alt="Gifts"
                width={300}
                height={0}
                className="mx-auto"
              />
            </div>

            {/* scroll down indicator */}
            <div></div>
          </div>
        );
    }
  }, [currentStep, setData]);

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
  }, [setCurrentStep]);

  return (
    <div
      className={`relative overflow-hidden flex justify-start flex-col mt-3 lg:mt-6 lg:md:w-2/3 md:mx-auto rounded-2xl bg-white border-2 gap-4 p-4 lg:p-6 shadow-md`}
    >
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

                setCurrentStep((prevState) => prevState - 1);
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

          {currentStep === 5 && (
            <Button
              variant="secondary"
              onClick={() => {
                localStorage.setItem("currentStep", "1");
                setCurrentStep(1);
              }}
            >
              {content[0].label}
              <RefreshCw size={16} className="ml-1" />
            </Button>
          )}
        </div>
      )}

      <H3Heading
        title={content[currentStep - 1].title}
        subtitle={content[currentStep - 1].subtitle}
        centered
      />

      {filterInput}

      {currentStep !== 5 && (
        <Button
          variant={"default"}
          className="flex items-center justify-center gap-2"
          onClick={() => {
            const nextStep = currentStep + 1;
            localStorage.setItem("currentStep", nextStep.toString());

            if (!showResults) {
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
