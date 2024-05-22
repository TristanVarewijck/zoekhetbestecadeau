"use client";

import { RangeSliderProps } from "@/app/types";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { nextStepHandler, saveOptionsToLocalStorage } from "@/lib/utils";

const RangeSlider = ({
  min,
  max,
  defaultValue,
  setCurrentStep,
  currentStep,
}: RangeSliderProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex justify-center flex-col items-center gap-4">
      {/* indicator */}
      <div className="flex gap-1 font-bold shadow-md p-2 rounded-md border  text-lg">
        <span>€{min}</span>
        <span>-</span>
        <span>€{value}</span>
      </div>

      {/* slider */}
      <div className="w-full">
        <div className="flex justify-between gap-4 text-lg font-bold mt-4">
          <div className="flex flex-col items-center">
            <span>💵</span>
            <span>€{min}</span>
          </div>

          <Slider
            defaultValue={defaultValue}
            max={max}
            min={min}
            step={1}
            value={value}
            onValueChange={(value) => {
              setValue(value);
            }}
          />
          <div className="flex flex-col items-center">
            <span>💰</span>
            <span>€{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
