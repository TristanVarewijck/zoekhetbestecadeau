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
  localStorageKey: string;
  setData?: Dispatch<SetStateAction<FilterProps | {}>>;
  multiple?: boolean;
}

export interface RangeSliderProps {
  min: number;
  max: number;
  setData?: Dispatch<SetStateAction<FilterProps | {}>>;
  localStorageKey: string;
}

export interface FilterProps {
  occasions?: string[];
  interests?: string[];
  gender?: string[];
  price?: number[];
}
