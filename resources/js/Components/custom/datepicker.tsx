import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Input } from "@/Components/ui/input";
import { DatePickerProps } from "@/types/types";
import { saveOptionsToLocalStorage } from "@/lib/utils";

export function Datepicker({ setData, localStorageKey }: DatePickerProps) {
    const formatDateToYYYYMMDD = (date: Date) => {
        const padToTwoDigits = (num: number) => num.toString().padStart(2, "0");
        return `${date.getFullYear()}-${padToTwoDigits(
            date.getMonth() + 1
        )}-${padToTwoDigits(date.getDate())}`;
    };

    const today = formatDateToYYYYMMDD(new Date());
    const [selected, setSelected] = useState<string>(today);

    useEffect(() => {
        const storedQuery = localStorage.getItem(localStorageKey);
        if (storedQuery) {
            const parsedDate = JSON.parse(storedQuery)[0].to;
            if (parsedDate) {
                setSelected(formatDateToYYYYMMDD(new Date(parsedDate)));
            }
        }
    }, [localStorageKey]);

    const handleOptionClick = (date: Date) => {
        const formattedDate = formatDateToYYYYMMDD(date);
        setSelected(formattedDate);
        saveOptionsToLocalStorage([formattedDate], localStorageKey);
        const deliveryQuery = { [localStorageKey]: [formattedDate] };

        setData &&
            setData((prevState) => ({
                ...prevState,
                ...deliveryQuery,
            }));
    };

    return (
        <div className="flex justify-center w-full">
            <DayPicker
                mode="single"
                selected={selected ? new Date(selected) : undefined}
                onSelect={(date) => date && handleOptionClick(date)}
                disabled={{ before: new Date() }}
                fromDate={new Date()} // Disable past dates
                toDate={
                    new Date(
                        new Date().setFullYear(new Date().getFullYear() + 1)
                    )
                } // Optionally set an upper limit for the date selection
                className="text-lg outline-none"
                footer={
                    <div className="mt-2">
                        <p className="text-sm font-bold">Geselecteerd:</p>
                        <Input
                            className="mt-1 text-lg font-bold border-2 disabled:cursor-default"
                            value={
                                selected ||
                                formatDateToYYYYMMDD(
                                    new Date(
                                        Date.now() + 7 * 24 * 60 * 60 * 1000
                                    )
                                )
                            }
                            placeholder="Selecteer de leverdatum"
                            disabled
                        />
                    </div>
                }
            />
        </div>
    );
}
