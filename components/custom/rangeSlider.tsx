"use client";

import { RangeSliderProps } from "@/app/types";
import { Slider } from "@/components/ui/slider";
import { saveOptionsToLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";

const RangeSlider = ({
  min,
  max,
  defaultValue,
  setData,
  localStorageKey,
}: RangeSliderProps) => {
  const [value, setValue] = useState(defaultValue);

  // get local storaged occasions if available
  useEffect(() => {
    const storedPrice = localStorage.getItem(localStorageKey);
    if (storedPrice) {
      setValue(JSON.parse(storedPrice));
    }
  }, [
    localStorageKey,
    /* no dependencies */
  ]);

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
            defaultValue={[parseInt(defaultValue)]}
            max={max}
            min={min}
            step={1}
            value={[parseInt(value)]}
            onValueChange={(value) => {
              setValue(value[0].toString());
              saveOptionsToLocalStorage([value[0].toString()], localStorageKey);
              setData &&
                setData((prevState) => ({
                  ...prevState,
                  [localStorageKey]: [value[0].toString()],
                }));
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
