import { FilterProps } from "@/types/types";
import { useEffect, useState } from "react";

export const useLocalStorageFilters = (
    filterKeys: (keyof FilterProps)[]
): FilterProps => {
    const [filters, setFilters] = useState<FilterProps>({
        occasions: [],
        interests: [],
        price: [],
        delivery: [],
    });

    useEffect(() => {
        const getFiltersFromLocalStorage = (): FilterProps => {
            return filterKeys.reduce((acc, key) => {
                const storedFilters = localStorage.getItem(key);
                if (storedFilters) {
                    acc[key] = JSON.parse(storedFilters);
                }
                return acc;
            }, {} as FilterProps);
        };

        const filters = getFiltersFromLocalStorage();
        setFilters(filters);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return filters;
};
