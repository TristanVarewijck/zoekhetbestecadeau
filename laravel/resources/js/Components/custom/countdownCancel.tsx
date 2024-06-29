import { BadgeX } from "lucide-react";
import { Button } from "../ui/button";
import { CountdownCancelProps } from "@/types/types";

const CountdownCancel = ({
    isTimerActive,
    setIsTimerActive,
    setCancelCounter,
    cancelCounter,
}: CountdownCancelProps) => {
    return (
        <div>
            {!isTimerActive ? (
                <Button
                    variant={"outline"}
                    onClick={() => {
                        setIsTimerActive(true);
                    }}
                >
                    <span className="flex items-center gap-1">
                        <BadgeX size={16} />
                        <span>Resetten en opnieuw beginnen</span>
                    </span>
                </Button>
            ) : (
                <Button
                    variant={"destructive"}
                    onClick={() => {
                        setIsTimerActive(false);
                        setCancelCounter(5);
                    }}
                >
                    <span className="flex items-center gap-1">
                        <BadgeX size={16} />
                        <span>Annuleren ({cancelCounter})</span>
                    </span>
                </Button>
            )}
        </div>
    );
};

export default CountdownCancel;
