import { useEffect, useState } from "react";

interface FilterProps {
  occasions?: string[];
  interests?: string[];
  gender?: string[];
  price?: number[];
}

export const useLocalStorageFilters = (
  filterKeys: (keyof FilterProps)[]
): FilterProps => {
  const [filters, setFilters] = useState<FilterProps>({});

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
