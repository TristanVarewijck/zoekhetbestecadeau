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
    const [selectedSubOptions, setSelectedSubOptions] = useState<{
        [key: string]: string[];
    }>({});

    useEffect(() => {
        setSelectedOptions([]);
        setSelectedSubOptions({});
        const storedQuery = localStorage.getItem(localStorageKey);

        if (variant === "alternative" && defaultSelectedOptions) {
            setSelectedOptions(defaultSelectedOptions);
            return;
        }

        if (storedQuery) {
            const parsedQuery = JSON.parse(storedQuery);
            setSelectedOptions(parsedQuery);
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
                // Clear sub-category selections if the parent category is deselected
                setSelectedSubOptions((prevState) => {
                    const newState = { ...prevState };
                    delete newState[id];
                    return newState;
                });
            } else if (selectedOptions.length < multiple) {
                updatedOptions = [...selectedOptions, id];
            } else {
                updatedOptions = selectedOptions;
            }
        } else {
            updatedOptions = selectedOptions.includes(id) ? [] : [id];
            // Clear all sub-category selections if only single selection is allowed
            setSelectedSubOptions({});
        }

        setSelectedOptions(updatedOptions);
        saveOptionsToLocalStorage(updatedOptions, localStorageKey);

        const query = {
            categoryIds: updatedOptions,
            subCategoryIds: updatedOptions.reduce((acc, categoryId) => {
                acc[categoryId] = selectedSubOptions[categoryId] || [];
                return acc;
            }, {}),
        };

        setData &&
            setData((prevState) => ({
                ...prevState,
                ...query,
            }));
    };

    const handleSubOptionClick = (parentId: string, subId: string) => {
        setSelectedSubOptions((prevState) => {
            const updatedSubOptions = { ...prevState };
            if (updatedSubOptions[parentId]?.includes(subId)) {
                updatedSubOptions[parentId] = updatedSubOptions[
                    parentId
                ].filter((id) => id !== subId);
            } else {
                updatedSubOptions[parentId] = updatedSubOptions[parentId]
                    ? [...updatedSubOptions[parentId], subId]
                    : [subId];
            }

            const query = {
                categoryIds: selectedOptions,
                subCategoryIds: {
                    ...updatedSubOptions,
                },
            };

            setData &&
                setData((prevState) => ({
                    ...prevState,
                    ...query,
                }));

            return updatedSubOptions;
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                className={`${
                    !variant
                        ? "grid grid-cols-2 gap-3 lg:grid-cols-3"
                        : "flex flex-col gap-2"
                }`}
            >
                {checkBoxDataSet.map((data) => (
                    <div key={data.id}>
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

                        <div>
                            {selectedOptions.includes(data.id.toString()) &&
                            data.sub_categories &&
                            data.sub_categories.length > 0 ? (
                                <div className="mt-2 p-2 bg-gray-50 flex flex-col gap-2 max-h-[325px] overflow-y-scroll">
                                    {data.sub_categories.map((subCategory) => {
                                        return (
                                            <div
                                                className={`flex gap-1 w-auto items-center flex-col sm:flex-row justify-between px-4 py-2 shadow-sm border-2 cursor-pointer ease-in-out duration-150 rounded-lg ${
                                                    selectedSubOptions[
                                                        data.id
                                                    ]?.includes(
                                                        subCategory.id.toString()
                                                    )
                                                        ? "border-primary"
                                                        : ""
                                                }`}
                                                key={subCategory.id}
                                                onClick={() => {
                                                    handleSubOptionClick(
                                                        data.id.toString(),
                                                        subCategory.id.toString()
                                                    );
                                                }}
                                            >
                                                <span className="text-sm font-semibold">
                                                    {subCategory.name}
                                                </span>

                                                {/* checkbox style */}
                                                <span
                                                    className={`${
                                                        selectedSubOptions[
                                                            data.id
                                                        ]?.includes(
                                                            subCategory.id.toString()
                                                        )
                                                            ? "bg-primary"
                                                            : "bg-white"
                                                    } w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center`}
                                                >
                                                    <span className="block w-1 h-1 bg-white rounded-full"></span>
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxTabs;
