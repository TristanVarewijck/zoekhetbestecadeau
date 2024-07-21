import content from "@/json/searchCta.json";
import { Badge } from "@/Components/ui/badge";
import { ArrowRight } from "lucide-react";

const Summarize = ({
    setCurrentStep,
}: {
    setCurrentStep: (step: number) => void;
}) => {
    const contentSteps = content.slice(0, 4);
    // for each step retrieve label and value by localStorage key
    const summarizeContent = contentSteps.map((step) => {
        const localStorageKey = step.localStorageKey;
        const label = step.label;
        const queryStep = step.step;

        const storedQuery = localStorage.getItem(localStorageKey as string);
        const value = JSON.parse(storedQuery as string);

        if (storedQuery && value.length > 0) {
            return { label, value, step: queryStep, localStorageKey };
        } else {
            return {
                label,
                value: "Niet geselecteerd",
                step: queryStep,
                localStorageKey,
            };
        }
    });

    return (
        <div className="text-sm text-gray-500 border p-4 cursor-pointer w-full md:w-auto rounded-md items-center">
            <div className="flex flex-col justify-center w-full gap-4">
                {summarizeContent.map((content) => (
                    <div
                        key={content.label}
                        onClick={() => {
                            setCurrentStep(content.step);
                            localStorage.setItem(
                                "currentStep",
                                content.step.toString()
                            );
                        }}
                    >
                        <div className="flex flex-col gap-2 md:flex-row">
                            <span className="text-primary font-bold cursor-pointer col-span-1">
                                {content.label}:
                            </span>

                            <div className="flex flex-wrap gap-1 items-center cursor-pointer col-span-2">
                                {content.value === "Niet geselecteerd" ? (
                                    <p>
                                        <span className="text-gray-500 flex items-center gap-1 underline ">
                                            Niet geselecteerd{" "}
                                            <ArrowRight size={16} />
                                        </span>
                                    </p>
                                ) : content.localStorageKey === "interests" ? (
                                    content.value.map((occasion: string) => (
                                        <Badge key={occasion}>{occasion}</Badge>
                                    ))
                                ) : (
                                    <div>
                                        <Badge>
                                            {content.localStorageKey === "price"
                                                ? `€${content.value.join(
                                                      " - "
                                                  )}`
                                                : content.localStorageKey ===
                                                  "delivery"
                                                ? content.value[0].replace(
                                                      /_/g,
                                                      " "
                                                  )
                                                : content.value}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summarize;
