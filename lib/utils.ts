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
  } catch (error) {
    console.error(error);
  }
};

export function getValuesByKeyName(obj: any, keyName: string) {
  const values = [];

  for (const key in obj) {
    if (obj[key] && obj[key][keyName]) {
      values.push(...obj[key][keyName]);
    }
  }

  return values;
}

export const pdfDownload = (folderName: string, fileName: string) => {
  // Create a new anchor element
  const link = document.createElement("a");
  link.href = `/${folderName}/${fileName}.pdf`;
  link.download = `${fileName}.pdf`;
  link.style.display = "none";

  // Append to the document and trigger 'click' to download
  document.body.appendChild(link);
  link.click();

  // Remove the link after download
  document.body.removeChild(link);
};
