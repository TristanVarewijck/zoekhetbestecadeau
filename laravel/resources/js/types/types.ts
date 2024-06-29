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
    forWho?: string[];
}

export interface PopularProductsProps {
    productsArray: CoolblueProductProps[];
    loading: boolean;
}

export interface CheckboxTabsProps {
    checkBoxDataSet: {
        icon: string;
        name: string;
        id: string;
    }[];
    localStorageKey: string;
    setData?: Dispatch<SetStateAction<FilterProps | {}>>;
    multiple?: number;
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
    forWho?: string[];
    price?: number[];
}

export interface CountdownCancelProps {
    isTimerActive: boolean;
    setIsTimerActive: (value: boolean) => void;
    setCancelCounter: (value: number) => void;
    cancelCounter: number;
}

export interface CoolblueProductProps {
    sku: number;
    mpn: number;
    upc: string;
    product_name: string;
    product_summary: string;
    product_features: string;
    brand: string;
    currency: string;
    price: number;
    condition: string;
    product_url: string;
    image_url: string;
    product_type: string;
    product_availability_state_id: number;
    shipping_cost: number;
    reviewsaveragescore: number;
    reviewscount: number;
    beforeprice: number | null;
    coolblueskeuze: boolean;
    delivery_time: string;
    subproducttypename: string;
    categoryid: number;
    languageid: number;
    subsidiaryid: number;
}
