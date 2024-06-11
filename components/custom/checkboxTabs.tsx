"use client";

import { CheckboxTabsProps } from "@/app/types";
import { SetStateAction, useEffect, useState } from "react";
import { saveOptionsToLocalStorage } from "@/lib/utils";

const CheckboxTabs = ({
  checkBoxDataSet,
  setData,
  localStorageKey,
  multiple,
}: CheckboxTabsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // get local storaged occasions if available

  // empty selected options if local storage key changes

  useEffect(() => {
    setSelectedOptions([]);
    const storedOccasions = localStorage.getItem(localStorageKey);
    if (storedOccasions) {
      setSelectedOptions(JSON.parse(storedOccasions));
    }
  }, [localStorageKey]);

  const handleOptionClick = (id: string) => {
    let updatedOptions: SetStateAction<string[]>;

    if (multiple) {
      if (selectedOptions.includes(id)) {
        updatedOptions = selectedOptions.filter((option) => option !== id);
      } else {
        updatedOptions = [...selectedOptions, id];
      }
    } else {
      updatedOptions = selectedOptions.includes(id) ? [] : [id];
    }

    setSelectedOptions(updatedOptions);
    saveOptionsToLocalStorage(updatedOptions, localStorageKey);
    const occasionQuery = { [localStorageKey]: updatedOptions };

    console.log(setData);
    setData &&
      setData(
        (prevState) => (
          console.log(prevState),
          {
            ...prevState,
            ...occasionQuery,
          }
        )
      );
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {checkBoxDataSet.map((data) => (
          <div
            className={`flex gap-1 w-full items-center flex-row-reverse justify-between p-2 shadow-sm border-2 cursor-pointer ease-in-out duration-150 rounded-lg ${
              selectedOptions.includes(data.id)
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            key={data.id}
            onClick={() => handleOptionClick(data.id)}
          >
            <span className="text-xl">{data.icon}</span>
            <span className="text-base font-medium">{data.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxTabs;
