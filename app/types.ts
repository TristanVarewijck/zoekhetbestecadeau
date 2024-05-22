import { Dispatch, SetStateAction } from "react";

export interface HeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export interface ProductProps {
  id: string;
  site: string;
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
  setData?: Dispatch<SetStateAction<any[]>>;
  localStorageKey: string;
  showResults: boolean;
}

export interface RangeSliderProps {
  min: number;
  max: number;
  defaultValue: number[];
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setData?: Dispatch<SetStateAction<any[]>>;
  localStorageKey: string;
  showResults: boolean;
}
