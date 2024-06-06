"use client";

import DownloadPdf from "@/components/custom/downloadPdf";
import H1Heading from "@/components/custom/heading/h1Heading";
import H2Heading from "@/components/custom/heading/h2Heading";
import H3Heading from "@/components/custom/heading/h3Heading";
import SectionLayout from "@/components/custom/sectionLayout";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <SectionLayout bgColor="white">
      <div className="md:mt-0 w-full flex flex-col justify-center max-w-[700px] mx-auto">
        <H1Heading
          title="Privacybeleid"
          subtitle="Laatst bijgewerkt: 5 juni 2024"
        />
        <div className="mt-1 lg:mt-2">
          <DownloadPdf
            buttonText={"Download het privacybeleid"}
            folderRoute={"legal/pdf"}
            fileName={"PRIVACYBELEID_ZOEKHETBESTECADEAU"}
          />
        </div>

        <div className="flex justify-center w-full mt-10">
          <div className="max-w-[700px] w-full flex flex-col gap-4">
            <H2Heading title="Inleiding" />
            <p>
              Zoekhetbestecadeau hecht veel waarde aan de privacy van haar
              gebruikers. In dit privacybeleid leggen wij uit welke gegevens wij
              verzamelen, hoe wij deze gegevens gebruiken en beschermen, en
              welke rechten gebruikers hebben met betrekking tot hun gegevens.
            </p>

            <H3Heading title="1. Gegevensverzameling en Gebruik" />
            <p>
              Zoekhetbestecadeau verzamelt geen persoonlijke gegevens zoals
              namen of e-mailadressen van haar gebruikers. Wij maken gebruik van
              cookies om affiliate commissies bij te houden. Cookies zijn kleine
              tekstbestanden die op uw apparaat worden opgeslagen wanneer u onze
              website bezoekt. Deze cookies helpen ons te registreren dat u via
              onze website een aankoop doet bij derde partijen, zodat wij een
              commissie kunnen ontvangen. Deze cookies bevatten geen
              persoonlijke identificatiegegevens.
            </p>

            <H3Heading title="2. Gebruik van Cookies" />
            <p>
              Wij maken gebruik van functionele cookies en tracking cookies:
            </p>
            <ul className="list-disc pl-5">
              <li>
                Functionele cookies zorgen ervoor dat de website naar behoren
                werkt en gebruikerservaringen worden verbeterd.
              </li>
              <li>
                Tracking cookies worden gebruikt om uw klikgedrag bij te houden
                en affiliate commissies te registreren.
              </li>
            </ul>
            <p>
              Gebruikers kunnen hun browserinstellingen aanpassen om cookies te
              weigeren of te verwijderen. Houd er rekening mee dat dit de
              functionaliteit van de website kan beïnvloeden.
            </p>

            <H3Heading title="3. Delen van Gegevens" />
            <p>
              Zoekhetbestecadeau deelt geen persoonlijke gegevens met derden.
              Wij werken echter samen met derde partijen voor het bijhouden van
              affiliate commissies. Deze partijen hebben hun eigen privacybeleid
              en zijn verantwoordelijk voor hun eigen gegevensverwerking.
            </p>

            <H3Heading title="4. Gegevensbeveiliging" />
            <p>
              Hoewel wij geen persoonlijke gegevens verzamelen, zorgen wij
              ervoor dat alle informatie die via onze website wordt
              uitgewisseld, wordt beschermd door geschikte technische en
              organisatorische beveiligingsmaatregelen.
            </p>

            <H3Heading title="5. Wijzigingen in het Privacybeleid" />
            <p>
              Zoekhetbestecadeau behoudt zich het recht voor dit privacybeleid
              te allen tijde te wijzigen. Wij raden gebruikers aan om regelmatig
              dit beleid te controleren op eventuele wijzigingen. De meest
              actuele versie van het privacybeleid is altijd beschikbaar op onze
              website.
            </p>

            <H3Heading title="Contact" />
            <p>
              Voor vragen over dit privacybeleid kunt u contact met ons opnemen
              via:{" "}
              <Link href={`mailto:${process.env.NEXT_PUBLIC_APP_MAIL}`}>
                zoekhetbestecadeau@gmail.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
