import content from "@/json/searchCta.json";
import { Badge } from "@/components/ui/badge";

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

    if (storedQuery) {
      const value = JSON.parse(storedQuery);
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

  console.log(summarizeContent);

  return (
    <div className="text-sm text-gray-500 border p-4 cursor-pointer flex flex-col gap-2">
      {summarizeContent.map((content) => (
        <div
          key={content.label}
          onClick={() => {
            setCurrentStep(content.step);
            localStorage.setItem("currentStep", content.step.toString());
          }}
        >
          <div className="flex justify-between items-center gap-2">
            <span className="text-primary font-bold cursor-pointer">
              {content.label}:
            </span>

            {content.localStorageKey === "interests" ? (
              content.value.map((occasion: string) => (
                <Badge key={occasion}>{occasion}</Badge>
              ))
            ) : (
              <Badge>{content.value}</Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Summarize;
