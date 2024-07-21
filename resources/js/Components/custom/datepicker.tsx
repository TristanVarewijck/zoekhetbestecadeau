import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";
import { Input } from "@/Components/ui/input";
import { DatePickerProps } from "@/types/types";
import { saveOptionsToLocalStorage } from "@/lib/utils";

export function Datepicker({ setData, localStorageKey }: DatePickerProps) {
    const [selected, setSelected] = useState<Date>();

    const parseNewDateToddMMyyyy = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    useEffect(() => {
        const storedQuery = localStorage.getItem(localStorageKey);
        if (storedQuery) {
            setSelected(new Date(JSON.parse(storedQuery)[0]));
        }
    }, [localStorageKey]);

    const handleOptionClick = (date: Date) => {
        setSelected(date);
        saveOptionsToLocalStorage([date.toString()], localStorageKey);
        const deliveryQuery = { [localStorageKey]: [date.toString()] };

        setData &&
            setData((prevState) => ({
                ...prevState,
                ...deliveryQuery,
            }));
    };

    return (
        <div className="w-full flex justify-center">
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={(date) => date && handleOptionClick(date)}
                className="text-lg outline-none "
                footer={
                    <div className="mt-2">
                        <p className="font-bold text-sm">Geselecteerd:</p>
                        <Input
                            className="font-bold  text-lg disabled:cursor-default border-2 mt-1"
                            value={parseNewDateToddMMyyyy(
                                selected ||
                                    new Date(
                                        Date.now() + 7 * 24 * 60 * 60 * 1000
                                    )
                            )}
                            placeholder="Selecteer de leverdatum"
                            disabled
                        />
                    </div>
                }
            />
        </div>
    );
}
