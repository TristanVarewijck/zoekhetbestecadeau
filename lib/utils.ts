import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// store selected occasions in local storage and redirect to finder page (util)
export const nextStepHandler = (
  currentStep: number,
  showResults: boolean
): number | "redirect" => {
  // store the current step in local storage
  localStorage.setItem("currentStep", (currentStep + 1).toString());
  // if current window is not the finder page, redirect to finder page
  if (!showResults) {
    return "redirect";
  } else {
    const newCurrentStep = currentStep + 1;
    return newCurrentStep;
  }
};

export const saveOptionsToLocalStorage = (
  selectedOptions: string[],
  localStorageKey: string
) => {
  try {
    // store selected occasions in local storage
    localStorage.setItem(localStorageKey, JSON.stringify(selectedOptions));
    // setData && setData((prevState) => [prevState, selectedOptions]);
    const optionsArray = [...selectedOptions, ...selectedOptions];
    return optionsArray;
    return "";
  } catch (error) {
    console.error(error);
  }
};
