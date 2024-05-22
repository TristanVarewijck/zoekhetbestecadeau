"use client";

import { CheckboxTabsProps } from "@/app/types";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { nextStepHandler, saveOptionsToLocalStorage } from "@/lib/utils";

const CheckboxTabs = ({
  checkBoxDataSet,
  setCurrentStep,
  currentStep,
  setData,
  localStorageKey,
  showResults,
}: CheckboxTabsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const router = useRouter();

  // get local storaged occasions if available
  useEffect(() => {
    const storedOccasions = localStorage.getItem(localStorageKey);
    if (storedOccasions) {
      setSelectedOptions(JSON.parse(storedOccasions));
    }
  }, [
    localStorageKey,
    /* no dependencies */
  ]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {checkBoxDataSet.map((data) => {
          return (
            <div
              className={`flex gap-1 w-full items-center flex-row-reverse justify-between p-2 shadow-sm border-2 cursor-pointer ease-in-out duration-150 rounded-lg ${
                selectedOptions.includes(data.id)
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
              key={data.id}
              onClick={() => {
                const isSelected = selectedOptions.includes(data.id)
                  ? []
                  : [data.id];
                setSelectedOptions(() => isSelected);
                saveOptionsToLocalStorage(isSelected, localStorageKey);
              }}
            >
              <span className="text-xl">{data.icon}</span>
              <span className="text-base font-medium">{data.name}</span>
            </div>
          );
        })}
      </div>

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
          {currentStep === 1 && !showResults ? "Start met zoeken" : "Volgende"}
        </span>
        <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default CheckboxTabs;
