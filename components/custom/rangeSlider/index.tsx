import React, { useCallback, useEffect, useState, useRef } from "react";
import "./rangeSlider.css";
import { RangeSliderProps } from "@/app/types";
import { saveOptionsToLocalStorage } from "@/lib/utils";

const RangeSlider = ({
  min,
  max,
  setData,
  localStorageKey,
}: RangeSliderProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      // @ts-ignore
      range.current.style.left = `${minPercent}%`;
      // @ts-ignore
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      // @ts-ignore
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="flex justify-center flex-col items-center gap-4 pb-5 mb-5">
      <div className="flex gap-1 font-bold p-2 rounded-md border text-lg min-w-[125px] justify-center">
        <span>€{minVal}</span>
        <span>-</span>
        <span>€{maxVal}</span>
      </div>

      <div className="relative">
        <div className="flex items-center justify-center ">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              saveOptionsToLocalStorage(
                [value.toString(), maxVal.toString()],
                localStorageKey
              );
              setData &&
                setData((prevState) => ({
                  ...prevState,
                  [localStorageKey]: [value, maxVal],
                }));

              minValRef.current = value;
            }}
            className="thumb thumb--left absolute w-[300px] xs:w-[350px] md:w-[500px] h-0 outline-none"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              saveOptionsToLocalStorage(
                [minVal.toString(), value.toString()],
                localStorageKey
              );
              setData &&
                setData((prevState) => ({
                  ...prevState,
                  [localStorageKey]: [minVal, value],
                }));
              maxValRef.current = value;
            }}
            className="thumb thumb--right absolute  w-[300px] xs:w-[350px] md:w-[500px] h-0 outline-none"
          />
          <div className="relative  w-[300px] xs:w-[350px] md:w-[500px]">
            <div className="absolute w-full h-[12px] bg-gray-300 rounded z-[1]" />
            <div
              ref={range}
              className="absolute h-[12px] bg-[hsl(var(--primary))] rounded z-[2]"
            />
            <div className="absolute left-0 mt-[16px] font-semibold">
              <span>€{min} 💵</span>
            </div>
            <div className="absolute right-0 mt-[16px] font-semibold ">
              <span>€{max} 💰</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
