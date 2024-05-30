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
            <H2Heading title="Bij zoekhetbestecadeau geloven we dat het vinden van het perfecte cadeau een magisch moment creëert! 🎁 Laat ons je helpen om die bijzondere gelegenheden te vieren met zorgvuldig uitgekozen geschenken die een blijvende indruk achterlaten." />
          </div>
        </div>
        <div className="flex justify-center w-full mt-3">
          <div className="max-w-[700px] w-full flex flex-col md:flex-row justify-between gap-4">
            <p>
              zoekhetbestecadeau is jouw ultieme gids in de wereld van
              geschenken, waar we je helpen om de perfecte verrassing te vinden
              voor je dierbaren. We begrijpen dat het soms lastig kan zijn om
              het juiste cadeau te vinden, dus hebben we het zoeken naar dat ene
              speciale item leuk en moeiteloos gemaakt!.
            </p>

            <p>
              Bij zoekhetbestecadeau zijn we gepassioneerd over het creëren van
              onvergetelijke herinneringen met doordachte cadeaus. We weten dat
              iedereen uniek is, met zijn eigen smaak en stijl. Daarom bieden we
              een uitgebreide selectie aan cadeau-opties, zodat je altijd iets
              vindt dat perfect past bij de persoon waar je van houdt.
            </p>
          </div>
        </div>
      </SectionLayout>
    </main>
  );
}
