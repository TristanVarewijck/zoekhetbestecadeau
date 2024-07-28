import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

const BackButton = ({ text }: { text: string }) => {
    return (
        <Button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 p-0 m-0 font-bold"
            variant={"link"}
        >
            <span>
                <ArrowLeft size={18} />
            </span>

            <span>{text}</span>
        </Button>
    );
};

export default BackButton;
