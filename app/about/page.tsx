import H1Heading from "@/components/custom/heading/h1Heading";
import H2Heading from "@/components/custom/heading/h2Heading";
import SectionLayout from "@/components/custom/sectionLayout";
import Image from "next/image";

export default function About() {
  return (
    <main>
      <SectionLayout bgColor="white" centered position={0}>
        <div className="mt-10 md:mt-0 w-full flex justify-center">
          <div className="max-w-[700px] flex flex-col gap-4">
            <H1Heading title="Over Mygivts" />
            <div className="relative h-[325px]">
              <Image
                src="https://via.placeholder.com/300x250"
                alt="About us"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <H2Heading title="Bij Mygivts geloven we dat het geven van het perfecte cadeau een waardevolle herinnering creëert. Laat ons je helpen om die speciale momenten te vieren met attent gekozen geschenken." />
          </div>
        </div>
        <div className="flex justify-center w-full mt-3">
          <div className="max-w-[700px] w-full flex flex-col md:flex-row justify-between gap-4">
            <p>
              Mygivts is een toonaangevend bedrijf dat mensen helpt bij het
              vinden van geschenken voor hun vrienden en familie. Wij begrijpen
              dat het vinden van het perfecte cadeau een uitdagende taak kan
              zijn, en daarom streven we ernaar om het proces eenvoudig en
              plezierig te maken.
            </p>

            <p>
              Bij Mygivts geloven we in het creëren van blijvende herinneringen
              door middel van doordachte geschenken. We begrijpen dat elk
              individu uniek is, met verschillende smaken en voorkeuren. Daarom
              bieden we een breed scala aan cadeau-opties, zodat u altijd iets
              speciaals kunt vinden dat perfect past bij de persoon voor wie het
              bedoeld is.
            </p>
          </div>
        </div>
      </SectionLayout>
    </main>
  );
}
