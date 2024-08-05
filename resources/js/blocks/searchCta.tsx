import { Button } from "../Components/ui/button";
import {
    ArrowLeft,
    ArrowRight,
    ListRestart,
    RefreshCw,
    Route,
} from "lucide-react";
import CheckboxTabs from "@/Components/custom/checkboxTabs";
import Summarize from "@/Components/custom/summarize";
import { useEffect, useMemo, useState } from "react";
import H3Heading from "@/Components/custom/heading/h3Heading";
import RangeSlider from "@/Components/custom/rangeSlider";
import { SearchCtaProps } from "@/types/types";
import CountdownCancel from "@/Components/custom/countdownCancel";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import content from "@/json/searchCta.json";
import { Datepicker } from "@/Components/custom/datepicker";

const SearchCta = ({
    setData,
    setCurrentStep,
    currentStep,
    showResults,
    occasions,
    interests,
}: SearchCtaProps) => {
    const [cancelCounter, setCancelCounter] = useState<number>(3);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTimerActive && cancelCounter > 0) {
            timer = setTimeout(() => {
                setCancelCounter((prev) => prev - 1);
            }, 1000);
        } else if (cancelCounter === 0) {
            localStorage.clear();
            window.location.href = "/";
        }
        return () => clearTimeout(timer);
    }, [isTimerActive, cancelCounter]);

    // render content based on the current step
    const filterInput = useMemo(() => {
        switch (currentStep) {
            case 1:
                return (
                    // GELEGENHEDEN
                    <CheckboxTabs
                        checkBoxDataSet={occasions}
                        setData={setData}
                        localStorageKey="occasions"
                    />
                );
            case 2:
                // PRIJS
                return (
                    <RangeSlider
                        min={5}
                        defaultMinValue={25}
                        defaultMaxValue={250}
                        max={1000}
                        localStorageKey="price"
                        setData={setData}
                    />
                );
            case 3:
                // INTERESSES
                return (
                    <CheckboxTabs
                        checkBoxDataSet={interests}
                        setData={setData}
                        localStorageKey="interests"
                        multiple={3}
                    />
                );

            case 4:
                // LEVERTIJD
                return (
                    <Datepicker setData={setData} localStorageKey="delivery" />
                );
            // RESULTATEN
            default:
                return (
                    <div className="flex flex-col items-center ">
                        <Summarize setCurrentStep={setCurrentStep} />
                    </div>
                );
        }
    }, [currentStep, setData]);

    // get the current step from local storage
    useEffect(() => {
        const storedStep = localStorage.getItem("currentStep");
        if (storedStep) {
            const step = parseInt(storedStep);
            if (step < 1) {
                setCurrentStep(1);
            } else {
                setCurrentStep(step);
            }
        }
    }, [setCurrentStep]);

    return (
        <div
            className={`relative overflow-hidden flex justify-start flex-col w-full rounded-b-2xl bg-white ${
                !showResults && "border-t-2 rounded-t-2xl"
            } border-l-2 border-r-2 border-b-2 gap-4 p-4 lg:p-6 shadow-md border-t-none`}
        >
            {showResults && (
                <div className="flex items-center">
                    {currentStep > 1 && (
                        <Button
                            className="mr-auto"
                            variant="secondary"
                            onClick={() => {
                                localStorage.setItem(
                                    "currentStep",
                                    (currentStep - 1).toString()
                                );

                                setCurrentStep((prevState) => prevState - 1);
                            }}
                        >
                            <ArrowLeft size={16} className="mr-1" />
                            {content[currentStep - 2].label}
                        </Button>
                    )}

                    {content.length !== currentStep && (
                        <Button
                            className="ml-auto"
                            variant="secondary"
                            onClick={() => {
                                setCurrentStep((prevState) => prevState + 1);
                                localStorage.setItem(
                                    "currentStep",
                                    (currentStep + 1).toString()
                                );
                            }}
                        >
                            {content[currentStep].label}
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    )}

                    {currentStep === 5 && (
                        <Button
                            variant="secondary"
                            onClick={() => {
                                localStorage.setItem("currentStep", "1");
                                setCurrentStep(1);
                            }}
                        >
                            {content[0].label}
                            <RefreshCw size={16} className="ml-1" />
                        </Button>
                    )}
                </div>
            )}

            <H3Heading
                title={content[currentStep - 1].title}
                subtitle={content[currentStep - 1].subtitle}
                centered
            />
            {filterInput}
            {currentStep !== 5 && (
                <Button
                    variant={"default"}
                    className="flex items-center justify-center gap-2 mx-auto"
                    onClick={() => {
                        const nextStep = currentStep + 1;
                        localStorage.setItem(
                            "currentStep",
                            nextStep.toString()
                        );

                        if (!showResults) {
                            window.location.href = "/finder";
                        } else {
                            setCurrentStep(nextStep);
                        }
                    }}
                >
                    <span className="font-bold">
                        {currentStep === 1 && !showResults
                            ? "Start met zoeken"
                            : content[currentStep].label}
                    </span>
                    <ArrowRight size={18} />
                </Button>
            )}

            {currentStep === 5 && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="mx-auto">
                            <ListRestart size={16} className="mr-1" />
                            Filters resetten en opnieuw beginnen
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Weet je zeker dat je je filters wilt resetten?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Door het resetten worden alle geselecteerde
                                filters verwijderd en begin je opnieuw.
                                {/* Ook wordt je wishlist automatisch geleegd. */}
                                Je kunt er ook voor kiezen om zelf terug te gaan
                                naar een vorige stap, met behoud van je huidige
                                filters
                                {/* en wishlist. */}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter
                            className="flex flex-col-reverse items-center justify-start gap-2 md:flex-row"
                            style={{
                                justifyContent: "space-between",
                            }}
                        >
                            <CountdownCancel
                                isTimerActive={isTimerActive}
                                setIsTimerActive={setIsTimerActive}
                                setCancelCounter={setCancelCounter}
                                cancelCounter={cancelCounter}
                            />
                            <AlertDialogAction>
                                <span className="flex items-center gap-1">
                                    <Route size={16} />
                                    <span>Zelf navigeren!</span>
                                </span>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
};

export default SearchCta;
