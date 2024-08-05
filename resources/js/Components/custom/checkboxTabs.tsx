"use client";

import { CheckboxTabsProps } from "@/types/types";
import { SetStateAction, useEffect, useState } from "react";
import { saveOptionsToLocalStorage } from "@/lib/utils";

const CheckboxTabs = ({
    checkBoxDataSet,
    setData,
    localStorageKey,
    defaultSelectedOptions,
    multiple,
    variant,
}: CheckboxTabsProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        setSelectedOptions([]);
        const storedQuery = localStorage.getItem(localStorageKey);

        if (variant === "alternative" && defaultSelectedOptions) {
            setSelectedOptions(defaultSelectedOptions);
            return;
        }

        if (storedQuery) {
            setSelectedOptions(JSON.parse(storedQuery));
            return;
        }
    }, [localStorageKey, variant]);

    const handleOptionClick = (id: string) => {
        let updatedOptions: SetStateAction<string[]>;
        if (multiple && multiple > 1) {
            if (selectedOptions.includes(id)) {
                updatedOptions = selectedOptions.filter(
                    (option) => option !== id
                );
            } else if (selectedOptions.length < multiple) {
                updatedOptions = [...selectedOptions, id];
            } else {
                updatedOptions = selectedOptions;
            }
        } else {
            updatedOptions = selectedOptions.includes(id) ? [] : [id];
        }

        setSelectedOptions(updatedOptions);
        saveOptionsToLocalStorage(updatedOptions, localStorageKey);
        const occasionQuery = { [localStorageKey]: updatedOptions };

        setData &&
            setData((prevState) => ({
                ...prevState,
                ...occasionQuery,
            }));
    };

    return (
        <div className="flex flex-col gap-4 ">
            <div
                className={`${
                    !variant
                        ? "grid grid-cols-2 gap-3 lg:grid-cols-3"
                        : "flex flex-col gap-2"
                }`}
            >
                {checkBoxDataSet.map((data) => (
                    <div
                        className={`flex gap-1 w-auto items-center flex-col sm:flex-row-reverse justify-between px-4 py-2 shadow-sm border-2 cursor-pointer ease-in-out duration-150 rounded-lg ${
                            selectedOptions.includes(data.id.toString())
                                ? "bg-primary text-white"
                                : "bg-white"
                        }`}
                        key={data.id}
                        onClick={() => {
                            handleOptionClick(data.id.toString());
                        }}
                    >
                        <span className="text-xl">{data.icon}</span>
                        <span className="text-base font-semibold">
                            {data.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxTabs;
