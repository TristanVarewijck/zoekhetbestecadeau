import H1Heading from "@/Components/custom/heading/h1Heading";
import SectionLayout from "@/Components/custom/sectionLayout";
import { Button } from "@/Components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
    const handleGoHome = () => {
        window.location.href = "/";
    };
    return (
        <SectionLayout bgColor="white">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center">
                        <H1Heading
                            title="404 - Pagina niet gevonden"
                            subtitle="Sorry, deze pagina bestaat niet of is verplaatst."
                            centered
                        />

                        <Button
                            onClick={handleGoHome}
                            className="mx-auto rounded-lg lg:mx-auto w-fit-content mt-4"
                        >
                            <div className="flex items-center justify-center gap-1">
                                <span>Homepage</span>
                                <Home size={16} />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
};

export default NotFound;
