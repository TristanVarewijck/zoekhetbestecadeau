import { Dispatch, SetStateAction } from "react";

export interface HeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export interface ProductProps {
  id: string;
  url: string;
  image: string;
  title: string;
  description: string;
  price: number;
  occasions?: string[];
  interests?: string[];
  gender?: string[];
}

export interface PopularProductsProps {
  productsArray: ProductProps[];
}

export interface CheckboxTabsProps {
  checkBoxDataSet: {
    icon: string;
    name: string;
    id: string;
  }[];
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setData?: Dispatch<SetStateAction<FilterQueryProps | null>>;
  localStorageKey: string;
  showResults: boolean;
}

export interface RangeSliderProps {
  min: number;
  max: number;
  defaultValue: string;
  setData?: Dispatch<SetStateAction<FilterQueryProps | null>>;
  localStorageKey: string;
}

interface FilterProps {
  occasions?: string[];
  interests?: string[];
  gender?: string[];
  price?: number[];
}

export interface FilterQueryProps {
  [key: number]: FilterProps | undefined;
}
