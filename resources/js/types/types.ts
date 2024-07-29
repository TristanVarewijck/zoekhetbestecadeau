import { Dispatch, SetStateAction } from "react";

export interface HeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
}

export interface SearchResultProps {
    productsArray: ProductProps[];
    loading: boolean;
    error: string | null;
    title?: string;
    subtitle?: string;
    productsPerPage: number;
}

export interface ProductsProps {
    occasions: Occasion[];
    interests: Interest[];
    products: ProductProps[];
}

export interface ProductProps {
    id: string;
    serial_number: string;
    name: string;
    description: string;
    price: string;
    brand_name?: string;
    brand_id: string;
    image_url?: string;
    category_id: string;
    sub_category_id?: string;
    sub_sub_category_id?: string;
    affiliate_link: string;
    created_at: string;
    updated_at: string;
    currency: string;
    category_path: string;
    delivery_time?: string;
    stock: number;
    size?: string;
    material?: string;
    color?: string;
    reviews: number;
    rating: number;
}

export interface SearchCtaProps {
    setData?: Dispatch<SetStateAction<FilterProps | {}>>;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    currentStep: number;
    showResults: boolean;
    occasions: Occasion[];
    interests: Interest[];
}

export interface SearchMergedProps {
    showResults: boolean;
    query?: FilterProps;
    setQuery?: Dispatch<SetStateAction<FilterProps | {}>>;
    occasions: Occasion[];
    interests: Interest[];
}

export interface PopularProductsProps {
    productsArray: CoolblueProductProps[];
    loading: boolean;
}

export interface HomeProps {
    products: ProductProps[];
    occasions: Occasion[];
    interests: Interest[];
    delivery: string[];
}

export interface CheckboxTabsProps {
    checkBoxDataSet: Interest[] | Occasion[] | Gender[];
    localStorageKey: string;
    setData?: Dispatch<SetStateAction<FilterProps | {}>>;
    multiple?: number;
    variant?: "alternative";
}

export interface RangeSliderProps {
    min: number;
    max: number;
    setData?: Dispatch<SetStateAction<FilterProps | {}>>;
    localStorageKey: string;
}

export interface DatePickerProps {
    setData?: Dispatch<SetStateAction<FilterProps | {}>>;
    localStorageKey: string;
}

export interface FilterProps {
    occasions?: string[];
    interests?: string[];
    delivery?: string[];
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

export interface Occasion {
    id: number;
    name: string;
    icon: string;
    created_at: string;
    updated_at: string;
}

export interface Interest {
    id: number;
    name: string;
    icon: string;
    created_at: string;
    updated_at: string;
}

export interface Gender {
    id: number;
    name: string;
    icon: string;
    created_at: string;
    updated_at: string;
}
