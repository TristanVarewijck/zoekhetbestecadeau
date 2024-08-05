import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const saveOptionsToLocalStorage = (
    selectedOptions: string[],
    localStorageKey: string
) => {
    try {
        const cleanArray = selectedOptions.filter((option) => option !== "");
        localStorage.setItem(localStorageKey, JSON.stringify(cleanArray));
        // setData && setData((prevState) => [prevState, selectedOptions]);
        const optionsArray = [...cleanArray];
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

export const pdfDownload = (folderRoute: string, fileName: string): void => {
    // Create a new anchor element
    const link = document.createElement("a");
    link.href = `/${folderRoute}/${fileName}.pdf`;
    link.download = `${fileName}.pdf`;
    link.style.display = "none";

    // Append to the document and trigger 'click' to download
    document.body.appendChild(link);
    link.click();

    // Remove the link after download
    document.body.removeChild(link);
};

export const productsFilter = (products: any[], filter: any) => {
    return {};
};

export const productsParser = (product: any) => {
    return {};
};
