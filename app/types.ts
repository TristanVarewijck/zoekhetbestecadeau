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
  setData?: Dispatch<SetStateAction<FilterProps | {}>>;
  localStorageKey: string;
  showResults: boolean;
}

export interface RangeSliderProps {
  min: number;
  max: number;
  defaultValue: string;
  setData?: Dispatch<SetStateAction<FilterProps | {}>>;
  localStorageKey: string;
}

export interface FilterProps {
  occasions?: string[];
  interests?: string[];
  gender?: string[];
  price?: number[];
}
