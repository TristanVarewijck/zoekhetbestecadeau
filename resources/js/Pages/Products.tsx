import H1Heading from "@/Components/custom/heading/h1Heading";
import SectionLayout from "@/Components/custom/sectionLayout";
import { Head } from "@inertiajs/react";

export default function Products() {
    return (
        <SectionLayout bgColor="white">
            <Head title="Bekijk al onze cadeaus" />
            <H1Heading
                title="Bekijk al onze cadeaus"
                subtitle="Begin met zoeken naar het perfecte cadeau 🔎"
            />
        </SectionLayout>
    );
}
